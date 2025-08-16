import { Button } from "@/components/ui/button";
import { Star, Sparkles, Shield, Leaf, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import mascotImage from "@/assets/tidybeast-mascot.png";
import citiesServedImage from "@/assets/cities-served.svg";
import customerSatisfactionImage from "@/assets/customer-satisfaction.svg";
import BookingModal from "./BookingModal";

const Hero = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookNow = () => {
    setShowBookingModal(true);
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight animate-fade-in-up-large" style={{ animationDelay: '0.2s' }}>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                onClick={handleBookNow}
              >
                Book Your Cleaning Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
          </div>

          {/* Social Proof Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            {[
              {
                icon: Star,
                value: "4.9",
                label: "Average Rating",
                subtext: "from 10,000+ reviews",
                color: "text-yellow-500",
                image: null
              },
              {
                icon: Shield,
                value: "50+",
                label: "Cities Served",
                subtext: "across India",
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
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        serviceName="Home Cleaning Service"
        serviceType="General Cleaning"
        basePrice={9999}
      />
    </section>
  );
};

export default Hero;
