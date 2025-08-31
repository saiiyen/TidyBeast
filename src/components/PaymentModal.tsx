import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  serviceName: string;
  onPaymentSuccess: (transactionId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  serviceName,
  onPaymentSuccess,
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const upiId = "9959047238@axl";

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };


  const handlePaymentConfirmation = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter transaction ID");
      return;
    }

    setLoading(true);
    try {
      // Simulate payment verification (in real app, verify with payment gateway)
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentSuccess(transactionId);
      toast.success("Payment verified successfully!");
      onClose();
    } catch (error) {
      toast.error("Payment verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            Complete Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service and Amount Info */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100">
            <h3 className="font-semibold text-gray-900">{serviceName}</h3>
            <p className="text-2xl font-bold text-teal-600">₹{amount}</p>
          </div>

          {/* Payment Method Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-center justify-center">
              <CreditCard className="w-5 h-5 text-teal-600" />
              <Label className="text-lg font-semibold text-gray-900">Pay using UPI ID</Label>
            </div>
          </div>

          {/* UPI Payment Section */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 block mb-2">
                UPI ID
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={upiId}
                  readOnly
                  className="flex-1 bg-gray-50 text-center font-medium"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyUpiId}
                  className="flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Copy this UPI ID and pay ₹{amount} using any UPI app like PhonePe, GPay, Paytm, etc.
              </p>
            </div>
          </div>

          {/* Transaction ID Input */}
          <div className="space-y-2">
            <Label htmlFor="transaction-id" className="text-sm font-medium text-gray-700">
              Enter Transaction ID *
            </Label>
            <Input
              id="transaction-id"
              placeholder="Enter transaction ID from your payment app"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              After making payment, enter the transaction ID here to confirm your booking
            </p>
          </div>

          {/* Payee Information */}
          <div className="bg-gray-50 p-3 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-1">Payment to:</h4>
            <p className="text-sm text-gray-600">BATTA BHANU PRAKASH REDDY</p>
            <p className="text-xs text-gray-500">Verify this name in your payment app</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentConfirmation}
              disabled={!transactionId.trim() || loading}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              {loading ? "Verifying..." : "Confirm Payment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
