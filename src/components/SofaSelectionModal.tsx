import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sofa, Check, Plus, Minus } from "lucide-react";
import { SOFA_SEATER_OPTIONS, getSofaPrice } from "@/config/pricing";

interface SofaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onSofaSelected: (details: string, price: number) => void;
}

const SofaSelectionModal: React.FC<SofaSelectionModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  onSofaSelected,
}) => {
  const [selectedSeater, setSelectedSeater] = useState<string>('2-seater');
  const [quantity, setQuantity] = useState<number>(1);

  const calculateTotalPrice = () => {
    return getSofaPrice(selectedSeater as any) * quantity;
  };

  const handleConfirm = () => {
    const totalPrice = calculateTotalPrice();
    const details = `${quantity} × ${selectedSeater} sofa${quantity > 1 ? 's' : ''}`;
    onSofaSelected(details, totalPrice);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Sofa className="w-6 h-6 text-white" />
            </div>
            {serviceName}
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            Select the size and quantity of your sofas for professional shampooing and deep cleaning service.
          </p>
        </DialogHeader>

        <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 p-2 md:p-0">
          {/* Seater Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {SOFA_SEATER_OPTIONS.map((option) => (
              <Card 
                key={option.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSeater === option.value 
                    ? 'border-2 border-teal-500 bg-teal-50 shadow-md' 
                    : 'border border-gray-200 hover:border-teal-300'
                }`}
                onClick={() => setSelectedSeater(option.value)}
              >
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="mb-2 md:mb-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl flex items-center justify-center ${
                      selectedSeater === option.value 
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600' 
                        : 'bg-gray-100'
                    }`}>
                      <Sofa className={`w-5 h-5 md:w-6 md:h-6 ${
                        selectedSeater === option.value ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{option.label}</h3>
                  <p className="text-base md:text-lg font-bold text-teal-600">₹{option.price}</p>
                  
                  {selectedSeater === option.value && (
                    <div className="mt-1 md:mt-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 mx-auto bg-teal-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quantity Selector */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  How many sofas need cleaning?
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Each {selectedSeater} sofa is cleaned for ₹{getSofaPrice(selectedSeater as any)}
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <div className="bg-teal-50 rounded-xl px-6 py-3 border-2 border-teal-200 min-w-[80px]">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-teal-600">{quantity}</div>
                    <div className="text-xs text-gray-600">
                      {quantity === 1 ? 'sofa' : 'sofas'}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                  className="w-10 h-10 rounded-full border-2 border-teal-300 hover:bg-teal-100 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick quantity buttons */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    variant={quantity === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuantity(num)}
                    className={`w-8 h-8 rounded-full text-xs ${
                      quantity === num
                        ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white" 
                        : "border-teal-300 hover:bg-teal-100"
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="border-2 border-teal-200 bg-teal-50">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs md:text-sm text-gray-600">Selected Configuration</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    {quantity} × {SOFA_SEATER_OPTIONS.find(opt => opt.value === selectedSeater)?.label}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs md:text-sm text-gray-600">Total Price</p>
                  <p className="text-xl md:text-2xl font-bold text-teal-600">
                    ₹{calculateTotalPrice().toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {quantity} × ₹{getSofaPrice(selectedSeater as any)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Features */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">What's Included:</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Professional steam cleaning with eco-friendly solutions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Deep stain removal and odor elimination
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Fabric protection treatment after cleaning
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Complete drying assistance and care tips
                </li>
              </ul>
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
              Continue - ₹{calculateTotalPrice().toLocaleString()}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs md:text-sm text-gray-500 px-2">
            <p>
              • Professional equipment and eco-friendly materials included<br />
              • Trained and certified cleaning specialists<br />
              • 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SofaSelectionModal;
