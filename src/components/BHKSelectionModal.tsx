import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowRight, Check, Sparkles } from "lucide-react";

import { ServicePricing } from "@/config/pricing";

interface BHKSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceType: string;
  basePrices: ServicePricing;
  onBHKSelected: (bhkType: string, price: number) => void;
}

const BHKSelectionModal: React.FC<BHKSelectionModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  serviceType,
  basePrices,
  onBHKSelected,
}) => {
  const [selectedBHK, setSelectedBHK] = useState<string>("");

  // Use the pricing directly since it's now properly typed
  const currentServicePricing = basePrices;

  // Error handling for missing pricing
  if (!currentServicePricing) {
    console.error('No pricing data available for service:', serviceName);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 text-center">
              Service Unavailable
            </DialogTitle>
            <p className="text-gray-600 text-center mt-2">
              Sorry, pricing information is currently unavailable. Please contact us directly.
            </p>
          </DialogHeader>
          <div className="mt-6 flex space-x-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={() => window.location.href = 'tel:+919959047238'}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              Call Us
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const bhkOptions = [
    {
      type: "Studio/1RK",
      title: "Studio/1RK",
      description: "Compact living spaces, perfect for singles",
      price: currentServicePricing["Studio/1RK"] || 1260,
      popular: false,
      features: ["1 Room", "1 Kitchen", "1 Bathroom", "Compact Living"]
    },
    {
      type: "1 BHK",
      title: "1 BHK",
      description: "Perfect for studio or 1 bedroom apartments",
      price: currentServicePricing["1 BHK"] || 1440,
      popular: false,
      features: ["1 Bedroom", "1 Kitchen", "1 Bathroom", "Living Area"]
    },
    {
      type: "2 BHK",
      title: "2 BHK", 
      description: "Ideal for 2 bedroom apartments and small families",
      price: currentServicePricing["2 BHK"] || 1800,
      popular: true,
      features: ["2 Bedrooms", "1 Kitchen", "2 Bathrooms", "Living Area", "Balcony"]
    },
    {
      type: "3 BHK",
      title: "3 BHK",
      description: "Great for larger families with 3 bedrooms",
      price: currentServicePricing["3 BHK"] || 2340,
      popular: false,
      features: ["3 Bedrooms", "1 Kitchen", "2-3 Bathrooms", "Living Area", "Dining Area", "Balcony"]
    },
    {
      type: "4 BHK",
      title: "4 BHK",
      description: "Comprehensive cleaning for large homes",
      price: currentServicePricing["4 BHK"] || 2880,
      popular: false,
      features: ["4 Bedrooms", "2 Kitchens", "3+ Bathrooms", "Multiple Living Areas", "Dining Area", "Multiple Balconies"]
    },
    {
      type: "5+ BHK",
      title: "5+ BHK",
      description: "Extensive cleaning for very large homes",
      price: currentServicePricing["5+ BHK"] || 3600,
      popular: false,
      features: ["5+ Bedrooms", "2+ Kitchens", "4+ Bathrooms", "Multiple Living Areas", "Multiple Dining Areas", "Multiple Balconies"]
    },
    {
      type: "Villa",
      title: "Villa",
      description: "Premium cleaning for independent villas",
      price: currentServicePricing["Villa"] || 4500,
      popular: false,
      features: ["Multiple Bedrooms", "Multiple Kitchens", "Multiple Bathrooms", "Garden Area", "Multiple Floors", "Outdoor Spaces"]
    }
  ];

  const handleBHKSelection = (bhkType: string, price: number) => {
    setSelectedBHK(bhkType);
    onBHKSelected(bhkType, price);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            Select Your Home Size
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            Choose your apartment size for {serviceName} to see accurate pricing
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 p-2 md:p-0">
          {bhkOptions.map((option) => (
            <Card 
              key={option.type}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                option.popular 
                  ? 'border-teal-500 ring-2 ring-teal-500 ring-offset-2 relative' 
                  : 'border-gray-200 hover:border-teal-300'
              }`}
              onClick={() => handleBHKSelection(option.type, option.price)}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-3 md:mb-4 gap-2">
                  <div className="flex items-center gap-2 md:gap-3 flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">{option.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right flex-shrink-0">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">₹{option.price.toLocaleString()}</div>
                    <div className="text-xs md:text-sm text-gray-500">per visit</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3 md:mb-4">
                  <h4 className="font-semibold text-gray-900 text-xs md:text-sm">Typical Coverage:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 md:gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0"></div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className={`w-full py-2 md:py-3 text-sm md:text-base font-semibold ${
                    option.popular
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white'
                      : 'bg-gray-100 hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white text-gray-800'
                  } transition-all duration-300 group`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Select {option.title} - ₹{option.price.toLocaleString()}
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-teal-50 rounded-lg border border-teal-200 mx-2 md:mx-0">
          <div className="flex items-start gap-2 md:gap-3">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs md:text-sm text-teal-800 font-medium">Price Includes:</p>
              <p className="text-xs text-teal-700 mt-1">
                All materials, professional cleaning supplies, and trained staff. 
                Final price may vary based on actual home condition and specific requirements.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BHKSelectionModal;
