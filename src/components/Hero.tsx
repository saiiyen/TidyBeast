import { Button } from "@/components/ui/button";
import { Star, Sparkles, Shield, Leaf, Clock, ArrowRight, Home, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import mascotImage from "@/assets/tidybeast-mascot.png";
import citiesServedImage from "@/assets/cities-served.svg";
import customerSatisfactionImage from "@/assets/customer-satisfaction.svg";
import BookingModal from "./BookingModal";
import ServiceSelectionModal from "./ServiceSelectionModal";
import { SERVICES_CONFIG, BHK_OPTIONS } from "@/config/pricing";

// Animated counter component
const AnimatedCounter = ({ targetValue, duration = 2000, suffix = "", prefix = "" }: {
  targetValue: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Extract numeric value from targetValue
          const numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
          
          if (isNaN(numericValue)) {
            return;
          }

          const startTime = Date.now();
          const startValue = 0;
          
          const updateCount = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            const easedProgress = easeOutCubic(progress);
            
            const currentCount = startValue + (numericValue - startValue) * easedProgress;
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };
          
          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, hasStarted]);

  const formatValue = (value: number) => {
    if (targetValue.includes('%')) {
      return Math.floor(value);
    }
    if (targetValue.includes('.')) {
      return value.toFixed(1);
    }
    return Math.floor(value);
  };

  return (
    <div ref={countRef} className="text-3xl font-bold text-gray-900 mb-2">
      {prefix}{hasStarted ? formatValue(count) : '0'}{suffix}
    </div>
  );
};

const Hero = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBHKSelector, setShowBHKSelector] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState<string>('');
  
  // Use home cleaning service as base for Hero pricing display
  const homeCleaningService = SERVICES_CONFIG.find(s => s.id === 'home-cleaning') || SERVICES_CONFIG[0];
  
  const bhkOptions = BHK_OPTIONS.map(option => {
    const price = homeCleaningService.pricing[option.value as keyof typeof homeCleaningService.pricing];
    const basePrice = homeCleaningService.basePrice;
    return {
      ...option,
      price: `₹${price.toLocaleString()}`,
      originalPrice: `₹${basePrice.toLocaleString()}`,
      popular: option.popular || false
    };
  });

  const handleBookNow = () => {
    if (!showBHKSelector) {
      setShowBHKSelector(true);
    } else if (selectedBHK) {
      setShowBookingModal(true);
      setShowBHKSelector(false);
    }
  };
  
  const handleBHKSelect = (bhk: string) => {
    setSelectedBHK(bhk);
    // Auto-proceed to booking after selection
    setTimeout(() => {
      setShowBookingModal(true);
      setShowBHKSelector(false);
    }, 300);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="absolute inset-0">
          {/* Animated geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(20, 184, 166) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 md:right-20">
        <div className="relative animate-float">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl rotate-12 opacity-20 animate-pulse"></div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-10 md:left-20">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-30 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg border border-teal-100 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-gray-700">Revolutionizing Cleaning Services in India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight animate-fade-in-up-large" style={{ animationDelay: '0.2s' }}>
              India's Most
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent relative">
                Trusted Cleaning
                <div className="absolute -top-2 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </span>
              <br />
              Platform
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Experience premium eco-friendly cleaning services delivered by trusted professionals. 
              Book in seconds, relax while we handle the rest.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: Shield, text: "Verified Professionals", color: "text-emerald-600" },
                { icon: Leaf, text: "100% Eco-Friendly", color: "text-green-600" },
                { icon: Clock, text: "Same Day Service", color: "text-teal-600" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`w-10 h-10 ${feature.color} bg-gray-50 rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {/* Main CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative"
                  onClick={handleBookNow}
                >
                  <Home className="w-5 h-5 mr-2" />
                  {showBHKSelector ? 'Select Your Home Size' : 'Book Your Cleaning Now'}
                  <ChevronDown className={`w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform ${showBHKSelector ? 'rotate-180' : ''}`} />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600 px-8 py-4 rounded-2xl font-semibold bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Services
                </Button>
              </div>
              
              {/* BHK Selector */}
              {showBHKSelector && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-100 max-w-4xl w-full mx-auto animate-fade-in-up">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Home Size</h3>
                    <p className="text-gray-600">Select your home size to get accurate pricing</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {bhkOptions.map((option, index) => (
                      <div
                        key={option.value}
                        className={`relative cursor-pointer group transition-all duration-300 hover:scale-105 ${
                          option.popular ? 'order-first md:order-none' : ''
                        }`}
                        onClick={() => handleBHKSelect(option.value)}
                      >
                        {option.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              Popular
                            </div>
                          </div>
                        )}
                        
                        <div className={`bg-white rounded-2xl p-4 border-2 transition-all duration-300 group-hover:border-teal-500 group-hover:shadow-lg ${
                          option.popular 
                            ? 'border-teal-500 ring-2 ring-teal-200 shadow-lg' 
                            : 'border-gray-200'
                        }`}>
                          <div className="text-center">
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                              option.popular 
                                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Home className="w-6 h-6" />
                            </div>
                            
                            <h4 className="font-bold text-gray-900 mb-1">{option.label}</h4>
                            <div className="text-lg font-bold text-teal-600 mb-1">{option.price}</div>
                            
                            <div className={`mt-3 w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                              option.popular
                                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                                : 'bg-gray-100 text-gray-700 group-hover:bg-teal-100 group-hover:text-teal-700'
                            }`}>
                              Select
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowBHKSelector(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            {[
              {
                icon: Star,
                value: "4.9",
                label: "Average Rating",
                subtext: "",
                color: "text-yellow-500",
                image: null
              },
              {
                icon: Shield,
                value: "10+",
                label: "Cities Served",
                subtext: "across Hyderabad",
                color: "text-teal-600",
                image: citiesServedImage
              },
              {
                icon: Sparkles,
                value: "99%",
                label: "Customer Satisfaction",
                subtext: "guaranteed quality",
                color: "text-emerald-600",
                image: customerSatisfactionImage
              }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                {stat.image ? (
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-16 h-16 mx-auto mb-4 ${stat.color} bg-gray-50 rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                )}
                <AnimatedCounter 
                  targetValue={stat.value} 
                  suffix={stat.value.includes('%') ? '%' : stat.value.includes('+') ? '+' : ''}
                  duration={2000 + index * 500}
                />
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Service Selection Modal */}
      <ServiceSelectionModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        preselectedBHK={selectedBHK}
      />
    </section>
  );
};

export default Hero;
