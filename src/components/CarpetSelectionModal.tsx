import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Calculator, Check } from "lucide-react";
import { getCarpetPrice } from "@/config/pricing";

interface CarpetSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onCarpetSelected: (squareFeet: number, price: number) => void;
}

const CarpetSelectionModal: React.FC<CarpetSelectionModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  onCarpetSelected,
}) => {
  const [squareFeet, setSquareFeet] = useState<number>(50);
  const [inputValue, setInputValue] = useState<string>("50");

  const handleSquareFeetChange = (value: string) => {
    setInputValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSquareFeet(numValue);
    }
  };

  const handlePresetClick = (value: number) => {
    setSquareFeet(value);
    setInputValue(value.toString());
  };

  const handleConfirm = () => {
    const price = getCarpetPrice(squareFeet);
    onCarpetSelected(squareFeet, price);
  };

  const totalPrice = getCarpetPrice(squareFeet);
  const baseRate = 20; // ₹20 per sq.ft
  const minCharge = 200; // Minimum charge
  const isMinimumApplied = squareFeet * baseRate < minCharge;

  const presetSizes = [
    { size: 25, label: "Small (5x5 ft)" },
    { size: 50, label: "Medium (7x7 ft)" },
    { size: 100, label: "Large (10x10 ft)" },
    { size: 150, label: "XL (12x12 ft)" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            {serviceName}
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
            Enter the size of your carpet area for professional shampooing and deep cleaning service.
          </p>
        </DialogHeader>

        <div className="mt-4 md:mt-6 space-y-4 md:space-y-6 p-2 md:p-0">
          {/* Size Input */}
          <Card className="border-2 border-teal-200 bg-teal-50">
            <CardContent className="p-4 md:p-6">
              <div className="mb-4">
                <Label htmlFor="squareFeet" className="text-base md:text-lg font-semibold text-gray-900">
                  Carpet Area (Square Feet)
                </Label>
                <div className="mt-2 relative">
                  <Input
                    id="squareFeet"
                    type="number"
                    min="1"
                    step="0.5"
                    value={inputValue}
                    onChange={(e) => handleSquareFeetChange(e.target.value)}
                    className="text-lg md:text-xl font-semibold text-center py-3 md:py-4 border-2 border-teal-300 focus:border-teal-500"
                    placeholder="Enter square feet"
                  />
                  <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
                    <Calculator className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                  </div>
                </div>
              </div>

              {/* Preset Size Options */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.size}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick(preset.size)}
                    className={`h-auto py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm ${
                      squareFeet === preset.size 
                        ? 'border-teal-500 bg-teal-100 text-teal-800' 
                        : 'border-teal-300 hover:border-teal-400 hover:bg-teal-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{preset.size} sq.ft</div>
                      <div className="text-xs text-gray-600">{preset.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Calculation */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Price Calculation:</h3>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Carpet Area:</span>
                  <span className="font-semibold text-sm md:text-base">{squareFeet} sq.ft</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Rate per sq.ft:</span>
                  <span className="font-semibold text-sm md:text-base">₹{baseRate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600">Calculated Price:</span>
                  <span className="font-semibold text-sm md:text-base">₹{(squareFeet * baseRate).toLocaleString()}</span>
                </div>
                
                {isMinimumApplied && (
                  <div className="flex justify-between items-center text-teal-600">
                    <span className="text-xs md:text-sm">Minimum Charge Applied:</span>
                    <span className="font-semibold text-sm md:text-base">₹{minCharge}</span>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-semibold text-gray-900">Total Price:</span>
                  <span className="text-xl md:text-2xl font-bold text-teal-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {isMinimumApplied && (
                <div className="mt-3 md:mt-4 p-2 md:p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-xs md:text-sm text-teal-800">
                    <strong>Note:</strong> Minimum charge of ₹{minCharge} applies for areas under {minCharge / baseRate} sq.ft
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Features */}
          <Card className="border border-gray-200">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">What's Included:</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Professional steam cleaning with industrial equipment
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Deep stain removal and odor elimination
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Eco-friendly cleaning solutions safe for pets and children
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-teal-600 flex-shrink-0" />
                  Carpet protection treatment and drying assistance
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
              disabled={!squareFeet || squareFeet <= 0}
              className="flex-1 py-2 md:py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              Continue - ₹{totalPrice.toLocaleString()}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs md:text-sm text-gray-500 px-2">
            <p>
              • Professional equipment and eco-friendly materials included<br />
              • Trained and certified cleaning specialists<br />
              • Free measurement verification on-site
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarpetSelectionModal;
