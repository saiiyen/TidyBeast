import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  Leaf, 
  Shield, 
  Clock, 
  Award,
  CheckCircle,
  Star,
  MapPin
} from "lucide-react";
import mascotImage from "@/assets/tidybeast-mascot.png";
import tidyBeastLogo from "@/assets/tidybeast-logo.png";
import careImage from "@/assets/care.png";
import excellenceImage from "@/assets/excellence.png";
import trustImage from "@/assets/trust.png";
import sustainabilityImage from "@/assets/sustainability.png";
import localTeamImage from "@/assets/localteam.png";
import professionalEquipmentImage from "@/assets/ProfessionalEquipment.png";
import transparentPricingImage from "@/assets/TransparentPricing.png";
import personalAttentionImage from "@/assets/PersonalAttention.png";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We go above and beyond to exceed expectations.",
      color: "text-red-500"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "We use only environmentally safe, non-toxic cleaning products for your family's health.",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Trusted & Insured",
      description: "Fully bonded and insured professionals you can trust in your home.",
      color: "text-blue-500"
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "Punctual, consistent, and dependable cleaning services you can count on.",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "50,000+", label: "Homes Cleaned", icon: CheckCircle },
    { number: "5 Star", label: "Average Rating", icon: Star },
    { number: "3 Years", label: "In Business", icon: Award }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former hospitality manager with 15+ years experience in service excellence.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Operations Manager",
      description: "Ensures quality control and training for all our cleaning professionals.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Lisa Rodriguez",
      role: "Customer Success",
      description: "Dedicated to making sure every customer experience is exceptional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-hero bg-clip-text text-transparent">TidyBeast</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're more than just a cleaning service. We're your partners in creating a healthier, 
            more organized living space that gives you more time for what matters most.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2025, TidyBeast was created to bring professional, reliable cleaning services 
                to busy families and professionals in your city. We're a new business built on a simple 
                belief: every home deserves spotless care and personal attention.
              </p>
              <p>
                As a growing local business, we're committed to earning your trust through quality work, 
                transparent pricing, and eco-friendly cleaning products. Our small team means every 
                customer gets our founder's personal attention and care.
              </p>
              <p>
                We believe a clean home should be a sanctuary, and we're here to help create that 
                peaceful space for you and your family.
              </p>
            </div>
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="bg-gradient-hero rounded-2xl h-96 flex items-center justify-center overflow-hidden relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white animate-float"></div>
                  <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-white animate-bounce-gentle"></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-white animate-pulse"></div>
                  <div className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full bg-white animate-bounce-gentle" style={{ animationDelay: '0.3s' }}></div>
                </div>
                
                <div className="text-center text-primary-foreground p-8 relative z-10">
                  <div className="relative">
                    <img 
                      src={tidyBeastLogo} 
                      alt="TidyBeast Logo" 
                      className="w-40 h-40 mx-auto mb-6 animate-bounce-gentle hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-lg"
                    />
                    {/* Floating particles around mascot */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-pulse opacity-80"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rounded-full animate-bounce-gentle opacity-90"></div>
                    <div className="absolute top-1/2 -right-4 w-3 h-3 bg-white rounded-full animate-ping opacity-60"></div>
                  </div>
                  <p className="text-2xl font-bold mb-2">Your Trusted Cleaning Partner</p>
                  <p className="text-lg opacity-90">Making homes sparkle since 2025</p>
                  
                  {/* Service highlights */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Professional</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Reliable</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Eco-Friendly</span>
                  </div>
                </div>
              </div>
              {/* Enhanced decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-light rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Why Choose TidyBeast? */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-in-up">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">TidyBeast</span>?
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four pillars that define our commitment to providing an exceptional cleaning service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: MapPin, 
                title: "Local Team", 
                description: "Serving your community with personal care. Our local team understands your area's unique needs.", 
                image: localTeamImage
              },
              { 
                icon: Shield, 
                title: "Professional Equipment", 
                description: "We use state-of-the-art cleaning equipment and eco-friendly supplies for a perfect clean.", 
                image: professionalEquipmentImage
              },
              { 
                icon: Heart, 
                title: "Transparent Pricing", 
                description: "Clear, upfront pricing with no hidden fees or surprises. What you see is what you pay.", 
                image: transparentPricingImage
              },
              { 
                icon: Star, 
                title: "Personal Attention", 
                description: "Every job gets our founder's personal oversight. Your satisfaction is our personal mission.", 
                image: personalAttentionImage
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up h-80 bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Strong Background for Text Readability */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-teal-500 p-2.5 rounded-xl shadow-lg">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <div className="transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-2">
                      <p className="text-gray-700 leading-relaxed text-sm font-medium">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle Hover Enhancement */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Values</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What drives us every day to deliver exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Heart, 
                title: "Care", 
                description: "We treat your home like our own, with gentle attention to every detail", 
                gradient: "from-red-500 to-pink-500",
                customImage: careImage
              },
              { 
                icon: Award, 
                title: "Excellence", 
                description: "Committed to the highest standards in every cleaning task", 
                gradient: "from-yellow-500 to-orange-500",
                customImage: excellenceImage
              },
              { 
                icon: Users, 
                title: "Trust", 
                description: "Building lasting relationships through reliability and honesty", 
                gradient: "from-blue-500 to-cyan-500",
                customImage: trustImage
              },
              { 
                icon: Leaf, 
                title: "Sustainability", 
                description: "Eco-friendly practices that protect your family and environment", 
                gradient: "from-green-500 to-emerald-500",
                customImage: sustainabilityImage
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={value.title}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in-up h-96"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Hero Image Section - 70% of card height */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={value.customImage} 
                        alt={value.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating service icon */}
                    <div className="absolute top-3 left-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 backdrop-blur-sm bg-opacity-90`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Value title overlay - appears on hover */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                        {value.title}
                      </h3>
                      <p className="text-white/90 text-xs drop-shadow">
                        Core Value • Essential • Always
                      </p>
                    </div>
                  </div>

                  {/* Content Section - 30% of card height */}
                  <div className="p-4 h-32 flex flex-col justify-center space-y-3">
                    {/* Value title and description */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>

                    {/* Value highlight badge */}
                    <div className="flex items-center justify-center">
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${value.gradient} text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                        <IconComponent className="w-4 h-4" />
                        <span>Our {value.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* CTA Section - Enhanced with prominent mascot */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-hero rounded-3xl p-8 text-primary-foreground max-w-4xl mx-auto shadow-elegant relative overflow-hidden">
            {/* Animated floating particles background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
              <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-20 right-20 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-32 right-32 w-3 h-3 bg-white/25 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Main content area with mascot integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              {/* Left side - Text content */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Ready to experience the <br/>
                  <span className="text-accent-foreground drop-shadow-lg">TidyBeast</span> difference?
                </h3>
                <p className="mb-6 text-lg opacity-95 leading-relaxed">
                  Join thousands of families across India who trust us with their homes.
                </p>
                <Button 
                  className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:animate-pulse-glow group relative overflow-hidden"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"></div>
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping opacity-75"></div>
                </Button>
              </div>

              {/* Right side - Prominent animated mascot */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  {/* Main mascot - now prominent and animated */}
                  <div className="relative transform hover:scale-110 transition-all duration-500 cursor-pointer group">
                    <img 
                      src={mascotImage} 
                      alt="TidyBeast Mascot" 
                      className="w-32 h-32 md:w-40 md:h-40 animate-bounce-gentle hover:animate-float transition-all duration-300 drop-shadow-2xl filter brightness-110 contrast-110" 
                    />
                    
                    {/* Glowing ring around mascot */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30"></div>
                    <div className="absolute inset-2 rounded-full bg-accent/30 animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Floating sparkle effects around mascot */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce-gentle opacity-80">✨</div>
                    <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-blue-300 rounded-full animate-float opacity-90" style={{ animationDelay: '0.7s' }}>💫</div>
                    <div className="absolute top-1/2 -right-6 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute top-1/4 -left-4 w-3 h-3 bg-green-300 rounded-full animate-bounce-gentle opacity-70" style={{ animationDelay: '0.3s' }}>🌟</div>
                    
                    {/* Speech bubble */}
                    <div className="absolute -top-8 -left-8 bg-white text-primary rounded-lg px-3 py-1 text-sm font-medium shadow-lg transform group-hover:scale-105 transition-all duration-300 animate-bounce-gentle opacity-0 group-hover:opacity-100">
                      Let's clean! 🧽
                      <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white transform translate-y-full"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-center">
                    <div className="flex items-center gap-1 text-sm font-medium animate-pulse">
                      <span>🏠</span>
                      <span>Your Cleaning Hero</span>
                      <span>🦸‍♂️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-white to-accent opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;