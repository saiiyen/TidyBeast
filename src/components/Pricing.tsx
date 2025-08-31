import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import CustomQuoteForm from "./CustomQuoteForm";
import BookingModal from "./BookingModal";
import mascotImage from "@/assets/tidybeast-mascot.png";
import largeHomesImage from "@/assets/LargeHomes.png";
import doorMatCleaningImage from "@/assets/DC.png";
import specialEventsImage from "@/assets/SpecialEvents.png";
import { SERVICES_CONFIG, BHK_MULTIPLIERS, BHK_OPTIONS } from "@/config/pricing";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: number, type: string} | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState<string>('2 BHK');

  interface PricingPlan {
    name: string;
    basePrice: number;
    price: string;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
    color: string;
  }

  const calculatePrice = (basePrice: number): string => {
    const multiplier = BHK_MULTIPLIERS[selectedBHK as keyof typeof BHK_MULTIPLIERS] || 1;
    const adjustedPrice = Math.round(basePrice * multiplier);
    return `₹${adjustedPrice.toLocaleString()}`;
  };

  const handleBookNow = (plan: PricingPlan) => {
    const multiplier = BHK_MULTIPLIERS[selectedBHK as keyof typeof BHK_MULTIPLIERS] || 1;
    const adjustedPrice = Math.round(plan.basePrice * multiplier);
    
    setSelectedPlan({
      name: plan.name,
      price: adjustedPrice,
      type: 'Home Cleaning'
    });
    setShowBookingModal(true);
  };

  // Use actual service configurations for consistent pricing
  const basePlans = [
    {
      name: "Home Cleaning",
      basePrice: SERVICES_CONFIG.find(s => s.id === 'home-cleaning')?.basePrice || 1800,
      duration: "per visit",
      description: "Perfect for regular maintenance cleaning",
      features: [
        "2-3 hour service",
        "Kitchen & bathroom cleaning",
        "Dusting & vacuuming",
        "Trash removal",
        "Eco-friendly products"
      ],
      popular: false,
      color: "border-border"
    },
    {
      name: "Deep Cleaning",
      basePrice: SERVICES_CONFIG.find(s => s.id === 'deep-cleaning')?.basePrice || 2800,
      duration: "per visit",
      description: "Comprehensive cleaning for every corner",
      features: [
        "4-5 hour service",
        "Everything in Basic",
        "Inside appliances",
        "Window cleaning",
        "Baseboards & fixtures",
        "Cabinet fronts"
      ],
      popular: true,
      color: "border-primary"
    },
    {
      name: "Premium Package",
      basePrice: SERVICES_CONFIG.find(s => s.id === 'sanitization')?.basePrice || 2000,
      duration: "per visit",
      description: "The ultimate cleaning experience",
      features: [
        "2-3 hour service",
        "Hospital-grade disinfection",
        "High-touch surface treatment",
        "Air purification service",
        "Complete sanitization"
      ],
      popular: false,
      color: "border-border"
    }
  ];
  
  // Convert base plans to display plans with adjusted prices
  const plans = basePlans.map(plan => ({
    ...plan,
    price: calculatePrice(plan.basePrice)
  }));

  const subscriptions = [
    { frequency: "Weekly", discount: "25% off", popular: true },
    { frequency: "Bi-weekly", discount: "20% off", popular: false },
    { frequency: "Monthly", discount: "15% off", popular: false }
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-teal-50 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">Transparent Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Choose Your Perfect <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Flexible pricing designed for every home and budget. No hidden fees, no surprises.
          </p>
          
          {/* BHK Selection */}
              <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Select Home Size:</span>
                <div className="flex gap-2">
                  {BHK_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedBHK(option.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        selectedBHK === option.value
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative bg-white rounded-3xl p-8 shadow-xl border transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up ${
                plan.popular 
                  ? 'border-teal-500 ring-2 ring-teal-500 ring-offset-4 scale-105' 
                  : 'border-gray-200 hover:border-teal-300'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="text-5xl font-black text-gray-900 mb-2">{plan.price}</div>
                  <div className="text-gray-500 font-medium">{plan.duration}</div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white'
                }`}
                onClick={() => handleBookNow(plan)}
              >
                <span className="flex items-center justify-center gap-2">
                  Book {plan.name}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                    plan.popular ? 'text-white' : 'text-gray-600 group-hover:text-white'
                  }`} />
                </span>
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Quote Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-12 -translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Need Something Custom?</h3>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Every space is unique. Get a personalized quote tailored to your specific needs, 
                space size, and cleaning requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={largeHomesImage} 
                      alt="Large Homes" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-semibold mb-1">Large Homes</div>
                  <div className="text-sm text-teal-100">Custom pricing for homes over 3000 sq ft</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={doorMatCleaningImage} 
                      alt="Door Mats Cleaning" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-semibold mb-1">Door Mats Cleaning</div>
                  <div className="text-sm text-teal-100">Professional mat and rug deep cleaning</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={specialEventsImage} 
                      alt="Special Events" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-semibold mb-1">Special Events</div>
                  <div className="text-sm text-teal-100">Post-party, construction, deep cleans</div>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  Get Your Custom Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-teal-100">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">No obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">24-hour response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {selectedPlan && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          serviceName={selectedPlan.name}
          serviceType={selectedPlan.type}
          basePrice={selectedPlan.price}
        />
      )}
    </section>
  );
};

export default Pricing;
