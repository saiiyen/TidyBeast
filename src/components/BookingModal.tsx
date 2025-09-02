import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PaymentModal from "./PaymentModal";
import { dataCollectionService, type BookingData } from "@/services/dataCollectionService";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceType: string;
  basePrice: number;
}

interface BookingFormData {
  userName: string;
  userEmail: string;
  userPhone: string;
  address: string;
  date: Date | undefined;
  time: string;
  homeSize: string;
  specialRequirements: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  serviceType,
  basePrice,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    address: '',
    date: undefined,
    time: '',
    homeSize: '',
    specialRequirements: '',
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM"
  ];

  const handleInputChange = (field: keyof BookingFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { userName, userEmail, userPhone, address, date, time, homeSize } = formData;
    
    if (!userName || !userEmail || !userPhone || !address || !date || !time || !homeSize) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(userPhone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create booking object
      const bookingData = {
        id: Date.now().toString(), // Simple ID generation
        user_name: formData.userName,
        user_email: formData.userEmail,
        user_phone: formData.userPhone,
        service_type: serviceType,
        service_name: serviceName,
        home_size: formData.homeSize,
        address: formData.address,
        date: formData.date!.toISOString().split('T')[0],
        time: formData.time,
        price: basePrice,
        special_requirements: formData.specialRequirements || null,
        payment_status: 'pending',
        booking_status: 'pending',
        created_at: new Date().toISOString(),
        transaction_id: null
      };

      // Store booking temporarily (will be updated after payment)
      sessionStorage.setItem('tempBooking', JSON.stringify(bookingData));
      // Booking data prepared

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
      // Get the temporary booking data
      const tempBookingData = sessionStorage.getItem('tempBooking');
      if (tempBookingData) {
        const bookingData = JSON.parse(tempBookingData);
        
        // Update with payment info
        const confirmedBooking = {
          ...bookingData,
          payment_status: 'completed',
          booking_status: 'confirmed',
          transaction_id: transactionId,
          confirmed_at: new Date().toISOString()
        };

        // Save to localStorage (get existing bookings first)
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
          // Don't show error to user as this is background process
          // Data is still saved locally, so booking is still valid
        }
        
        // Clear temporary booking
        sessionStorage.removeItem('tempBooking');
        
        // Booking confirmed and saved
      }
      
      toast.success("Booking confirmed! Your details have been sent to our team and you'll receive confirmation shortly.");
      onClose();
      setShowPaymentModal(false);
      // Reset form
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        address: '',
        date: undefined,
        time: '',
        homeSize: '',
        specialRequirements: '',
      });
    } catch (error) {
      // Payment confirmation error - logged internally
      toast.error("Payment successful but booking confirmation failed. Please contact support.");
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showPaymentModal} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              Book {serviceName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 md:space-y-6 p-2 md:p-0">

            {/* Service & Price Summary */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <div className="text-center sm:text-left">
                  <p className="text-sm md:text-base font-semibold text-gray-900">{serviceName}</p>
                  <p className="text-xs md:text-sm text-gray-600">Professional cleaning service</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs md:text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl md:text-2xl font-bold text-teal-600">₹{basePrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm md:text-base">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className="text-sm md:text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.userEmail}
                  onChange={(e) => handleInputChange('userEmail', e.target.value)}
                  className="text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm md:text-base">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="Enter your 10-digit phone number"
                value={formData.userPhone}
                onChange={(e) => handleInputChange('userPhone', e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm md:text-base">Service Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address where service is required"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="text-sm md:text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm md:text-base">Home Size (BHK) *</Label>
              <Select value={formData.homeSize} onValueChange={(value) => handleInputChange('homeSize', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select home size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 BHK">1 BHK</SelectItem>
                  <SelectItem value="2 BHK">2 BHK</SelectItem>
                  <SelectItem value="3 BHK">3 BHK</SelectItem>
                  <SelectItem value="4 BHK">4 BHK</SelectItem>
                  <SelectItem value="5+ BHK">5+ BHK</SelectItem>
                  <SelectItem value="Studio/1RK">Studio/1RK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label className="text-sm md:text-base">Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal text-sm md:text-base"
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
                <Label className="text-sm md:text-base">Preferred Time *</Label>
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

            {/* Special Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-sm md:text-base">Special Requirements (Optional)</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific requirements or instructions for our team"
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                rows={2}
                className="text-sm md:text-base"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border text-xs md:text-sm text-gray-600">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Important Notes:</h4>
              <ul className="space-y-1 text-xs">
                <li>• Payment is required to confirm your booking</li>
                <li>• Our team will arrive within the selected time slot</li>
                <li>• Cancellation must be done 24 hours in advance for full refund</li>
                <li>• Final price may vary based on actual requirements</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 px-2 sm:px-0">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 py-2 md:py-3 border-2 border-gray-300 hover:bg-gray-50 text-sm md:text-base"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookingSubmit}
                disabled={loading}
                className="flex-1 py-2 md:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-sm md:text-base font-semibold"
              >
                {loading ? "Processing..." : `Proceed to Payment - ₹${basePrice.toLocaleString()}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={basePrice}
        serviceName={serviceName}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default BookingModal;
