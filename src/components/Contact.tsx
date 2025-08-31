import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import mascotImage from "@/assets/tidybeast-mascot.png";
import scheduleServiceImage from "@/assets/scheduleservice.png";
import getQuoteImage from "@/assets/getaquote.png";
import emergencyCleanImage from "@/assets/emergencyclean.png";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import ServiceSelectionModal from "./ServiceSelectionModal";
import { useState, useRef } from "react";
import { directEmailService, type EmailFormData } from "@/services/directEmailService";
import { dataCollectionService, type ContactFormData } from "@/services/dataCollectionService";
import CopyableEmail from "@/components/ui/CopyableEmail";

const Contact = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form refs for collecting form data
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceTypeRef = useRef<HTMLSelectElement>(null);
  const homeSizeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  const handleContactFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validate form data
    const firstName = firstNameRef.current?.value?.trim() || '';
    const lastName = lastNameRef.current?.value?.trim() || '';
    const email = emailRef.current?.value?.trim() || '';
    const phone = phoneRef.current?.value?.trim() || '';
    const serviceType = serviceTypeRef.current?.value || '';
    const homeSize = homeSizeRef.current?.value || '';
    const message = messageRef.current?.value?.trim() || '';
    
    // Basic validation
    if (!firstName || !lastName || !email || !phone || !serviceType || !message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9]?[0-9]{7,14}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create contact form data
      const contactData: ContactFormData = {
        id: `contact-${Date.now()}`,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        service_type: serviceType,
        home_size: homeSize || undefined,
        message: message,
        created_at: new Date().toISOString()
      };
      
      // Send data to collection service
      await dataCollectionService.handleContactFormData(contactData);
      
      // Send email using robust email service with multiple fallbacks
      const emailData: EmailFormData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        serviceType: serviceType,
        homeSize: homeSize,
        message: message
      };
      
      const emailSent = await directEmailService.sendContactEmail(emailData);
      
      if (!emailSent) {
        console.warn('⚠️ Email delivery failed through all methods, but user was shown fallback options');
        // User will see fallback options via the directEmailService
      } else {
        console.log('✅ Email sent successfully to choosetidybeast@gmail.com');
      }
      
      // Show success message
      toast.success('Thank you! We\'ll get back to you within 2 hours.');
      
      // Reset form
      if (firstNameRef.current) firstNameRef.current.value = '';
      if (lastNameRef.current) lastNameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (phoneRef.current) phoneRef.current.value = '';
      if (serviceTypeRef.current) serviceTypeRef.current.value = '';
      if (homeSizeRef.current) homeSizeRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 99590 47238",
      subtitle: "Mon-Sun: 9AM - 9PM",
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "choosetidybeast@gmail.com",
      subtitle: "We reply within 2 hours",
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      title: "Service Areas",
      details: "Hyderabad City",
      subtitle: "All major areas",
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Sun: 9AM-9PM",
      subtitle: "7 days a week service",
      color: "text-purple-500"
    }
  ];

  const serviceAreas = [
    "Banjara Hills",
    "Jubilee Hills",
    "Gachibowli",
    "HITEC City",
    "Madhapur",
    "Kondapur",
    "Kukatpally",
    "Bachupally",
    "Nizampet",
    "Miyapur",
    "Mallampet",
    "Gandi-maisamma",
    "And more areas..."
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule Service",
      description: "Book your regular cleaning service online with flexible scheduling options",
      action: "Book Now",
      image: scheduleServiceImage
    },
    {
      icon: MessageCircle,
      title: "Get a Quote",
      description: "Receive a free, detailed estimate tailored to your specific cleaning needs",
      action: "Get Quote",
      image: getQuoteImage
    },
    {
      icon: CheckCircle,
      title: "Emergency Clean",
      description: "Same-day service available for urgent cleaning situations",
      action: "Call Now",
      image: emergencyCleanImage
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In <span className="bg-gradient-hero bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your space? Contact us for a free consultation and quote.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div
                key={action.title}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up h-96 bg-white cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  if (action.title === "Schedule Service") {
                    setShowBookingModal(true);
                  } else if (action.title === "Get a Quote") {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    toast.info('Please fill out the contact form below to get a personalized quote!');
                  } else if (action.title === "Emergency Clean") {
                    window.location.href = 'tel:+9959047238';
                  }
                }}
              >
                {/* Background Image */}
                <img 
                  src={action.image} 
                  alt={action.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Clean background for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-600 p-2.5 rounded-xl shadow-xl border-2 border-white/20">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
                      {action.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-800 leading-relaxed mb-4 font-semibold drop-shadow-sm">
                    {action.description}
                  </p>
                  
                  <Button 
                    variant={action.title === "Emergency Clean" ? "destructive" : "default"}
                    size="lg"
                    className="w-full group-hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {action.action}
                      <img 
                        src={mascotImage} 
                        alt="TidyBeast" 
                        className="w-4 h-4 opacity-80 group-hover:animate-bounce-gentle filter brightness-0 invert"
                      />
                    </span>
                  </Button>
                </div>
                
                {/* Subtle Hover Enhancement */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Send us a message
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 2 hours.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      First Name
                    </label>
                    <Input 
                      ref={firstNameRef}
                      placeholder="John" 
                      className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Last Name
                    </label>
                    <Input 
                      ref={lastNameRef}
                      placeholder="Doe" 
                      className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Email Address
                  </label>
                  <Input 
                    ref={emailRef}
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Phone Number
                  </label>
                  <Input 
                    ref={phoneRef}
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="h-12 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100" 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Service Type
                    </label>
                    <select 
                      ref={serviceTypeRef}
                      className="w-full h-12 p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="">Select a service</option>
                      <option value="Home Cleaning">Home Cleaning</option>
                      <option value="Deep Cleaning">Deep Cleaning</option>
                      <option value="House Maiden">House Maiden</option>
                      <option value="Move-In/Out">Move-In/Out</option>
                      <option value="Sofa & Carpet">Sofa & Carpet</option>
                      <option value="Sanitization">Sanitization</option>
                      <option value="Kitchen Cleaning">Kitchen Cleaning</option>
                      <option value="Washroom Cleaning">Washroom Cleaning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Home Size (BHK)
                    </label>
                    <select 
                      ref={homeSizeRef}
                      className="w-full h-12 p-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="">Select home size</option>
                      <option value="Studio/1RK">Studio/1RK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK">5+ BHK</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Message
                  </label>
                  <Textarea 
                    ref={messageRef}
                    placeholder="Tell us about your cleaning needs, space size, specific requirements..."
                    className="min-h-[120px] rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 resize-none"
                  />
                </div>
                
                <Button 
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={handleContactFormSubmit}
                  disabled={isSubmitting}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <p className="flex items-center justify-center gap-1">
                    Or reach us directly at 
                    <CopyableEmail 
                      email="choosetidybeast@gmail.com" 
                      className="font-medium text-gray-700 text-sm inline-flex"
                      showTooltip={false}
                    />
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info & Service Areas */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card 
                      key={info.title}
                      className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-card"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className={`h-5 w-5 ${info.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-card-foreground">{info.title}</h4>
                            {info.title === "Email Us" ? (
                              <CopyableEmail email={info.details} className="text-primary font-medium" />
                            ) : (
                              <p className="text-primary font-medium">{info.details}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Service Areas */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Card className="border-0 bg-gradient-card shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-card-foreground flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Service Areas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We proudly serve the following areas:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceAreas.map((area, index) => (
                      <div 
                        key={area}
                        className="flex items-center space-x-2 text-card-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Don't see your area? <span 
                        className="text-primary font-medium cursor-pointer hover:underline" 
                        onClick={() => window.location.href = 'tel:+919959047238'}
                      >
                        Contact us
                      </span> to check if we can service your location.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contact */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Card className="border-0 bg-gradient-hero text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Need Emergency Cleaning?</h3>
                  <p className="opacity-90 mb-4">
                    Same-day service available for urgent cleaning needs
                  </p>
                  <Button 
                    variant="premium"
                    size="lg"
                    onClick={() => window.location.href = 'tel:+919959047238'}
                  >
                    Call +91 99590 47238
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Selection Modal */}
      <ServiceSelectionModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </section>
  );
};

export default Contact;
