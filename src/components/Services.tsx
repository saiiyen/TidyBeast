import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomQuoteForm from "./CustomQuoteForm";
import mascotImage from "@/assets/tidybeast-mascot.png";
import homeCleaningImage from "@/assets/HomeCleaning.png";
import deepCleaningImage from "@/assets/DeepCleaning.png";
import officeCleaningImage from "@/assets/OfficeCleaning.png";
import moveInOutImage from "@/assets/MoveInOut.png";
import sofaCarpetImage from "@/assets/SofaCarpetCleaning.png";
import sanitizationImage from "@/assets/Sanitization.svg";
import { 
  Home, 
  Sparkles, 
  Building2, 
  Truck, 
  Sofa, 
  ShieldCheck,
  Clock,
  Indian_Rupee as Rupee,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Home Cleaning",
      description: "Transform your home into a spotless sanctuary with our comprehensive cleaning service",
      price: "7,400",
      duration: "2-3",
      features: ["Deep kitchen & bathroom cleaning", "Complete dusting & vacuuming", "Trash removal & sanitization"],
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      popular: false,
      customImage: homeCleaningImage
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Our most thorough service that leaves no corner untouched in your space",
      price: "12,400",
      duration: "4-5",
      features: ["Everything in regular cleaning", "Inside appliances cleaning", "Window & glass cleaning"],
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      popular: true,
      customImage: deepCleaningImage
    },
    {
      icon: Building2,
      title: "Office Cleaning",
      description: "Professional workspace cleaning that boosts productivity and health",
      price: "Custom",
      duration: "Flexible",
      features: ["Desk & workstation sanitization", "Common areas deep clean", "Restroom maintenance"],
      gradient: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      popular: false,
      customImage: officeCleaningImage
    },
    {
      icon: Truck,
      title: "Move-In/Out",
      description: "Complete cleaning solution for your moving needs, leaving spaces pristine",
      price: "16,500",
      duration: "4-6",
      features: ["Empty space deep cleaning", "Cabinet & storage interiors", "All appliance cleaning"],
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      popular: false,
      customImage: moveInOutImage
    },
    {
      icon: Sofa,
      title: "Sofa & Carpet",
      description: "Specialized deep cleaning for your valuable furniture and carpets",
      price: "6,600",
      duration: "1-2",
      features: ["Professional steam cleaning", "Advanced stain removal", "Fabric protection treatment"],
      gradient: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      popular: false,
      customImage: sofaCarpetImage
    },
    {
      icon: ShieldCheck,
      title: "Sanitization",
      description: "Hospital-grade sanitization for maximum health and safety protection",
      price: "9,900",
      duration: "2-3",
      features: ["Hospital-grade disinfection", "High-touch surface treatment", "Air purification service"],
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      popular: false,
      customImage: sanitizationImage
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-teal-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-emerald-100 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-teal-50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">Premium Cleaning Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Expert Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive range of professional cleaning services, 
            each designed to meet your specific needs with eco-friendly solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in-up min-h-[600px] ${
                  service.popular ? 'ring-2 ring-teal-500 ring-offset-4' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Hero Image Section */}
                <div className="relative h-80 overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.customImage} 
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating service icon */}
                  <div className="absolute top-6 left-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 backdrop-blur-sm bg-opacity-90`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Floating price tag */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg transform group-hover:scale-105 transition-all duration-300">
                      <div className="text-xs text-gray-500 font-medium">Starting at</div>
                      <div className="text-lg font-bold text-gray-900">₹{service.price}</div>
                    </div>
                  </div>
                  
                  {/* Service title overlay - appears on hover */}
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow">
                      Professional • Reliable • Eco-friendly
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  {/* Service title and description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Duration info */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">{service.duration} hours</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-gray-600">
                          <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book {service.title}
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Have specific requirements? Our team will create a personalized cleaning plan just for you.
              </p>
              <Button 
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;