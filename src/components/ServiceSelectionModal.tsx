import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Phone, ArrowRight, Home, Sparkles, Building2, Truck, Sofa, ShieldCheck, HelpCircle, ChefHat, Bath, Plus, Minus } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import PaymentModal from "./PaymentModal";
import { dataCollectionService, type BookingData } from "@/services/dataCollectionService";
import { emailService } from "@/services/emailService";
import { SERVICES_CONFIG, getServicePrice } from "@/config/pricing";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBHK?: string;
}

interface ServiceOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface BookingFormData {
  userName: string;
  userEmail: string;
  userPhone: string;
  address: string;
  date: Date | undefined;
  time: string;
  selectedService: string;
  homeSize: string;
  quantity: number; // For quantity-based services
  specialRequirements: string;
}

const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  preselectedBHK,
}) => {
  const [step, setStep] = useState(1); // 1: Service Selection, 2: User Details, 3: Payment
  const [formData, setFormData] = useState<BookingFormData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    address: '',
    date: undefined,
    time: '',
    selectedService: '',
    homeSize: preselectedBHK || '',
    quantity: 1, // Default quantity for quantity-based services
    specialRequirements: '',
  });
  
  const calculatePrice = (serviceId: string): number => {
    const service = serviceOptions.find(s => s.id === serviceId);
    if (!service) return 0;
    
    // For quantity-based services (kitchen/washroom)
    if (serviceId === 'kitchen-cleaning' || serviceId === 'washroom-cleaning') {
      const basePrice = serviceId === 'kitchen-cleaning' ? 1500 : 799;
      return basePrice * formData.quantity;
    }
    
    // For other services, use BHK-based pricing
    if (!formData.homeSize) return 0;
    return getServicePrice(serviceId, formData.homeSize as any);
  };
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map services from unified config
  const serviceOptions: ServiceOption[] = SERVICES_CONFIG.map(service => ({
    id: service.id,
    name: service.name,
    price: service.basePrice,
    duration: service.duration,
    icon: service.id === 'home-cleaning' ? Home :
          service.id === 'deep-cleaning' ? Sparkles :
          service.id === 'house-maiden' ? Building2 :
          service.id === 'move-in-out' ? Truck :
          service.id === 'sofa-carpet' ? Sofa :
          service.id === 'sanitization' ? ShieldCheck :
          service.id === 'kitchen-cleaning' ? ChefHat :
          service.id === 'washroom-cleaning' ? Bath : Home,
    description: service.description
  }));

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const selectedServiceData = serviceOptions.find(s => s.id === formData.selectedService);

  const handleInputChange = (field: keyof BookingFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, selectedService: serviceId }));
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.selectedService) {
      toast.error("Please select a service");
      return;
    }
    if (step === 2 && !validateUserDetails()) {
      return;
    }
    setStep(prev => prev + 1);
  };

  const validateUserDetails = (): boolean => {
    const { userName, userEmail, userPhone, address, date, time, homeSize } = formData;
    
    if (!userName || !userEmail || !userPhone || !address || !date || !time || !homeSize) {
      toast.error("Please fill all required fields including home size");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!/^[+]?[\d\s-()]{10,}$/.test(userPhone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async () => {
    if (!selectedServiceData) return;

    setLoading(true);
    try {
      const finalPrice = calculatePrice(selectedServiceData.id);
      const bookingData = {
        id: Date.now().toString(),
        user_name: formData.userName,
        user_email: formData.userEmail,
        user_phone: formData.userPhone,
        service_type: selectedServiceData.id,
        service_name: selectedServiceData.name,
        home_size: formData.homeSize,
        address: formData.address,
        date: formData.date!.toISOString().split('T')[0],
        time: formData.time,
        price: finalPrice,
        special_requirements: formData.specialRequirements || null,
        payment_status: 'pending',
        booking_status: 'pending',
        created_at: new Date().toISOString(),
        transaction_id: null
      };

      sessionStorage.setItem('tempBooking', JSON.stringify(bookingData));
      setShowPaymentModal(true);
      toast.success("Booking details saved! Please complete payment to confirm.");
    } catch (error) {
      // Booking error - logged internally
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      const tempBookingData = sessionStorage.getItem('tempBooking');
      if (tempBookingData) {
        const bookingData = JSON.parse(tempBookingData);
        
        const confirmedBooking = {
          ...bookingData,
          payment_status: 'completed',
          booking_status: 'confirmed',
          transaction_id: transactionId,
          confirmed_at: new Date().toISOString()
        };

        // Save to local storage for user reference
        const existingBookings = JSON.parse(localStorage.getItem('tidybeast_bookings') || '[]');
        existingBookings.push(confirmedBooking);
        localStorage.setItem('tidybeast_bookings', JSON.stringify(existingBookings));
        
        // Trigger data collection service (Google Sheets & Email)
        try {
          // Triggering data collection for booking
          await dataCollectionService.handleBookingData(confirmedBooking as BookingData);
          // Data collection completed successfully
        } catch (dataError) {
          // Data collection failed (non-critical) - logged internally
        }
        
        // Also send via direct email service for immediate delivery
        try {
          await emailService.sendBookingConfirmationEmail({
            id: confirmedBooking.id,
            user_name: confirmedBooking.user_name,
            user_email: confirmedBooking.user_email,
            user_phone: confirmedBooking.user_phone,
            service_type: confirmedBooking.service_type,
            service_name: confirmedBooking.service_name,
            home_size: confirmedBooking.home_size,
            address: confirmedBooking.address,
            date: confirmedBooking.date,
            time: confirmedBooking.time,
            price: confirmedBooking.price,
            special_requirements: confirmedBooking.special_requirements,
            transaction_id: transactionId
          });
          // Direct booking email sent successfully
        } catch (emailError) {
          // Direct booking email failed - logged internally
        }
        
        sessionStorage.removeItem('tempBooking');
      }
      
      toast.success("Booking confirmed! Your details have been sent to our team and you'll receive confirmation shortly.");
      onClose();
      setShowPaymentModal(false);
      setStep(1);
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        address: '',
        date: undefined,
        time: '',
        selectedService: '',
        homeSize: preselectedBHK || '',
        quantity: 1,
        specialRequirements: '',
      });
    } catch (error) {
      // Payment confirmation error - logged internally
      toast.error("Payment successful but booking confirmation failed. Please contact support.");
    }
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:+919959047238';
    toast.info("Calling TidyBeast support...");
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      userName: '',
      userEmail: '',
      userPhone: '',
      address: '',
      date: undefined,
      time: '',
      selectedService: '',
      homeSize: preselectedBHK || '',
      quantity: 1,
      specialRequirements: '',
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPaymentModal} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 text-center">
              {step === 1 && "Choose Your Service"}
              {step === 2 && `Book ${selectedServiceData?.name}`}
            </DialogTitle>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>1</div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>2</div>
              </div>
            </div>
          </DialogHeader>
          
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600">Select the cleaning service that best fits your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceOptions.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        formData.selectedService === service.id
                          ? 'border-teal-600 bg-teal-50 shadow-md'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          formData.selectedService === service.id ? 'bg-teal-600' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            formData.selectedService === service.id ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-teal-600">
                              {(service.id === 'kitchen-cleaning' || service.id === 'washroom-cleaning') ? 
                                `₹${calculatePrice(service.id).toLocaleString()}` :
                                (formData.homeSize ? `₹${calculatePrice(service.id).toLocaleString()}` : 'Select home size')
                              }
                            </div>
                            <div className="text-sm text-gray-500">{service.duration}</div>
                          </div>
                          {(service.id === 'kitchen-cleaning' || service.id === 'washroom-cleaning') ? (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.quantity} {service.id === 'kitchen-cleaning' ? 'kitchen(s)' : 'washroom(s)'} - ₹{service.id === 'kitchen-cleaning' ? '1500' : '799'} each
                            </div>
                          ) : formData.homeSize && (
                            <div className="text-xs text-gray-500 mt-1">
                              {formData.homeSize} pricing included
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Selector for Kitchen/Washroom Services */}
              {formData.selectedService && (formData.selectedService === 'kitchen-cleaning' || formData.selectedService === 'washroom-cleaning') && (
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-teal-900 mb-2">
                      How many {formData.selectedService === 'kitchen-cleaning' ? 'kitchens' : 'washrooms'} need cleaning?
                    </h3>
                    <p className="text-sm text-teal-700">
                      Each {formData.selectedService === 'kitchen-cleaning' ? 'kitchen' : 'washroom'} is cleaned separately for ₹{formData.selectedService === 'kitchen-cleaning' ? '1,500' : '799'}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                      disabled={formData.quantity <= 1}
                      className="w-12 h-12 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    
                    <div className="bg-white rounded-xl px-6 py-4 border-2 border-teal-300 min-w-[100px]">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600">{formData.quantity}</div>
                        <div className="text-sm text-gray-600">
                          {formData.quantity === 1 
                            ? (formData.selectedService === 'kitchen-cleaning' ? 'kitchen' : 'washroom')
                            : (formData.selectedService === 'kitchen-cleaning' ? 'kitchens' : 'washrooms')
                          }
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleInputChange('quantity', Math.min(10, formData.quantity + 1))}
                      disabled={formData.quantity >= 10}
                      className="w-12 h-12 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Quick quantity buttons */}
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4].map((num) => (
                      <Button
                        key={num}
                        variant={formData.quantity === num ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange('quantity', num)}
                        className={`w-10 h-10 rounded-full ${
                          formData.quantity === num 
                            ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white" 
                            : "border-teal-300 hover:bg-teal-100"
                        }`}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">
                      Total: ₹{calculatePrice(formData.selectedService).toLocaleString()}
                    </div>
                    <div className="text-sm text-teal-700">
                      {formData.quantity} × ₹{formData.selectedService === 'kitchen-cleaning' ? '1,500' : '799'} each
                    </div>
                  </div>
                </div>
              )}

              {/* Help Section */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-orange-800 mb-1">Need Help Choosing?</h3>
                    <p className="text-sm text-orange-700 mb-3">Not sure which service is right for you? Our experts are here to help!</p>
                    <Button
                      onClick={handleCallSupport}
                      variant="outline"
                      size="sm"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call +91 99590 47238
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!formData.selectedService}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && selectedServiceData && (
            <div className="space-y-6">
              {/* Selected Service Summary */}
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                    <selectedServiceData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-teal-900">{selectedServiceData.name}</h3>
                    <p className="text-teal-700">{selectedServiceData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">₹{calculatePrice(selectedServiceData.id).toLocaleString()}</div>
                    <div className="text-sm text-teal-600">{selectedServiceData.duration}</div>
                    {formData.homeSize && (
                      <div className="text-xs text-teal-600 mt-1">{formData.homeSize}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Details Form */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.userName}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.userPhone}
                  onChange={(e) => handleInputChange('userPhone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Service Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address where service is required"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Home Size (BHK) *</Label>
                <Select value={formData.homeSize} onValueChange={(value) => handleInputChange('homeSize', value)}>
                  <SelectTrigger className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select home size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Studio/1RK">Studio/1RK</SelectItem>
                    <SelectItem value="1 BHK">1 BHK</SelectItem>
                    <SelectItem value="2 BHK">2 BHK</SelectItem>
                    <SelectItem value="3 BHK">3 BHK</SelectItem>
                    <SelectItem value="4 BHK">4 BHK</SelectItem>
                    <SelectItem value="5+ BHK">5+ BHK</SelectItem>
                  </SelectContent>
                </Select>
                {formData.homeSize && (
                  <div className="text-sm text-teal-600 mt-1">
                    Pricing adjusted for {formData.homeSize}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => handleInputChange('date', date)}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger className="w-full">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Special Requirements (Optional)</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any specific requirements or instructions for our team"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  {loading ? "Processing..." : `Proceed to Payment (₹${calculatePrice(selectedServiceData.id).toLocaleString()})`}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedServiceData ? calculatePrice(selectedServiceData.id) : 0}
        serviceName={selectedServiceData?.name || ''}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ServiceSelectionModal;
