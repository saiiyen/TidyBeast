import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import mascotImage from "@/assets/tidybeast-mascot.png";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Gachibowli, Hyderabad",
      rating: 5,
      text: "TidyBeast transformed my home! Their eco-friendly approach and attention to detail is unmatched. I now have more time for my family.",
      type: "testimonial",
      color: "bg-rose-50"
    },
    {
      name: "Rajesh Kumar",
      location: "Hitech City, Hyderabad", 
      rating: 5,
      text: "Professional team, arrived on time, left my office spotless. Highly recommend!",
      type: "testimonial",
      color: "bg-green-50"
    },
    {
      stat: "4.9",
      subtitle: "Average Rating",
      type: "stat",
      color: "bg-blue-50"
    },
    {
      name: "Meera Reddy",
      location: "Jubilee Hills, Hyderabad",
      rating: 5,
      text: "Booked online in minutes. The process was so simple and the results exceeded expectations.",
      type: "testimonial",
      color: "bg-purple-50"
    },
    {
      stat: "10+",
      subtitle: "Cities Served across Hyderabad",
      type: "stat",
      color: "bg-orange-50"
    },
    {
      name: "Anita Patel",
      location: "Banjara Hills, Hyderabad",
      rating: 5,
      text: "Finally found a cleaning service I can trust. They use safe products and my kids love them!",
      type: "testimonial",
      color: "bg-yellow-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="bg-gradient-hero bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real customers who trust TidyBeast
          </p>
        </div>

        {/* Enhanced Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <Card 
              key={index}
              className={`${item.type === 'testimonial' && index === 0 ? 'md:col-span-2 md:row-span-1' : ''} 
                         ${item.type === 'testimonial' && index === 5 ? 'md:col-span-2' : ''}
                         ${item.color} border-0 shadow-soft hover:shadow-elegant transition-all duration-500 animate-scale-in transform hover:-translate-y-4 card-hover-effect group relative overflow-hidden cursor-pointer`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                background: `linear-gradient(135deg, ${item.color.replace('bg-', '')}, transparent)`
              }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-primary/20 rounded-full animate-bounce-gentle"></div>
                <div className="absolute top-1/2 right-8 w-1 h-1 bg-accent/40 rounded-full animate-pulse"></div>
              </div>
              
              <CardContent className="p-8 relative z-10">
                {/* Enhanced mascot decoration for testimonials */}
                {item.type === 'testimonial' && (
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-all duration-500">
                    <img 
                      src={mascotImage} 
                      alt="TidyBeast" 
                      className="w-8 h-8 group-hover:animate-wiggle transform group-hover:scale-110" 
                    />
                  </div>
                )}
                
                {item.type === 'testimonial' ? (
                  <div className="space-y-6 relative">
                    {/* Enhanced Stars with animation */}
                    <div className="flex gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5 fill-yellow-400 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300" 
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    
                    {/* Enhanced Quote with better typography */}
                    <blockquote className="text-card-foreground leading-relaxed text-lg font-medium relative">
                      <span className="text-4xl text-primary/30 absolute -top-2 -left-2">"</span>
                      <span className="relative z-10">{item.text}</span>
                      <span className="text-4xl text-primary/30 absolute -bottom-4 -right-2">"</span>
                    </blockquote>
                    
                    {/* Enhanced Author section */}
                    <div className="pt-4 border-t border-border/30 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm">
                            {item.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <cite className="font-bold text-primary not-italic text-lg group-hover:text-primary-dark transition-colors duration-300">
                            {item.name}
                          </cite>
                          <p className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors duration-300">
                            📍 {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 relative">
                    {/* Enhanced mascot decoration for stats */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 opacity-30 group-hover:opacity-80 transition-all duration-500">
                      <img 
                        src={mascotImage} 
                        alt="TidyBeast" 
                        className="w-12 h-12 group-hover:animate-bounce-gentle transform group-hover:scale-125" 
                      />
                    </div>
                    
                    {/* Enhanced stat display */}
                    <div className="relative">
                      <div className="text-5xl md:text-6xl font-bold text-primary mb-3 group-hover:scale-125 transition-all duration-500 relative">
                        {item.stat}
                        <div className="absolute inset-0 bg-gradient-hero bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {item.stat}
                        </div>
                      </div>
                      <div className="text-muted-foreground font-semibold text-lg group-hover:text-card-foreground transition-colors duration-300">
                        {item.subtitle}
                      </div>
                    </div>
                    
                    {/* Enhanced decorative elements */}
                    <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse group-hover:animate-bounce-gentle"></div>
                    </div>
                    <div className="absolute bottom-8 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>
        
        {/* Additional testimonial features */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-3 bg-gradient-card rounded-full px-6 py-3 shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-card-foreground">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-card rounded-full px-6 py-3 shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
              <img src={mascotImage} alt="TidyBeast" className="w-5 h-5 animate-bounce-gentle" />
              <span className="font-semibold text-card-foreground">always Happy Customers</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust TidyBeast for their cleaning needs. 
            <span className="text-primary font-semibold"> Your satisfaction is our guarantee!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;