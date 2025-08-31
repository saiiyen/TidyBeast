import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ChefHat, Bath } from "lucide-react";
import { SERVICES_CONFIG } from "@/config/pricing";

interface QuantitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceType: "kitchen-cleaning" | "washroom-cleaning";
  onQuantitySelected: (quantity: number, totalPrice: number) => void;
}

const QuantitySelectionModal: React.FC<QuantitySelectionModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  serviceType,
  onQuantitySelected,
}) => {
  const [quantity, setQuantity] = useState(1);

  const service = SERVICES_CONFIG.find(s => s.id === serviceType);
  const basePrice = service?.basePrice || 0;
  const totalPrice = basePrice * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    onQuantitySelected(quantity, totalPrice);
  };

  const getIcon = () => {
    return serviceType === "kitchen-cleaning" ? ChefHat : Bath;
  };

  const getQuantityLabel = () => {
    return serviceType === "kitchen-cleaning" ? "kitchens" : "washrooms";
  };

  const getDescription = () => {
    if (serviceType === "kitchen-cleaning") {
      return "Select the number of kitchens you need cleaned. Each kitchen includes deep appliance cleaning, cabinet interior & exterior, countertop cleaning, and sink sanitization.";
    }
    return "Select the number of washrooms you need cleaned. Each washroom includes toilet & shower deep cleaning, tile & grout sanitization, mirror polishing, and floor deep cleaning.";
  };

  const IconComponent = getIcon();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            {serviceName}
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            {getDescription()}
          </p>
        </DialogHeader>

        <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 p-2 md:p-0">
          {/* Quantity Selector */}
          <Card className="border-2 border-teal-200 bg-teal-50">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  How many {getQuantityLabel()} need cleaning?
                </h3>
                
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  
                  <div className="bg-white rounded-xl px-4 py-3 md:px-6 md:py-4 border-2 border-teal-300 min-w-[70px] md:min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{quantity}</div>
                    <div className="text-xs md:text-sm text-gray-600">{quantity === 1 ? getQuantityLabel().slice(0, -1) : getQuantityLabel()}</div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>

                {/* Quick quantity buttons */}
                <div className="flex justify-center gap-2 mb-3 md:mb-4">
                  {[1, 2, 3, 4].map((num) => (
                    <Button
                      key={num}
                      variant={quantity === num ? "default" : "outline"}
                      size="sm"
                      onClick={() => setQuantity(num)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-sm ${
                        quantity === num 
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white" 
                          : "border-teal-300 hover:bg-teal-100"
                      }`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs md:text-sm text-gray-600">Price per {getQuantityLabel().slice(0, -1)}</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">₹{basePrice.toLocaleString()}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs md:text-sm text-gray-600">Total Price</p>
                  <p className="text-xl md:text-2xl font-bold text-teal-600">₹{totalPrice.toLocaleString()}</p>
                </div>
              </div>
              
              {quantity > 1 && (
                <div className="mt-3 md:mt-4 p-2 md:p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-xs md:text-sm text-teal-800">
                    {quantity} × ₹{basePrice.toLocaleString()} = ₹{totalPrice.toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 px-2 sm:px-0">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 py-2 md:py-3 border-2 border-gray-300 hover:bg-gray-50 text-sm md:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 py-2 md:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-sm md:text-base"
            >
              Continue - ₹{totalPrice.toLocaleString()}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs md:text-sm text-gray-500 px-2">
            <p>
              • All materials and professional supplies included<br />
              • Trained and verified cleaning professionals<br />
              • Satisfaction guaranteed
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuantitySelectionModal;
