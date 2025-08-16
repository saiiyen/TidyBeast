import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, QrCode, CreditCard } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi'>('qr');
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

  const generateQRCodeData = () => {
    return `upi://pay?pa=${upiId}&pn=BATTA%20BHANU%20PRAKASH%20REDDY&am=${amount}&cu=INR&tn=Payment%20for%20${encodeURIComponent(serviceName)}`;
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

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Choose Payment Method</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={paymentMethod === 'qr' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('qr')}
                className="flex items-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </Button>
              <Button
                variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('upi')}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                UPI ID
              </Button>
            </div>
          </div>

          {/* Payment Methods */}
          {paymentMethod === 'qr' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%236B46C1'/%3E%3Ctext x='50' y='60' fill='white' text-anchor='middle' font-size='20' font-weight='bold'%3EP%3C/text%3E%3C/svg%3E" 
                    alt="PhonePe" 
                    className="w-8 h-8"
                  />
                  <span className="font-semibold text-gray-900">PhonePe</span>
                </div>
                
                {/* QR Code */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mx-auto w-64 h-64 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDI5IDI5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgZmlsbD0id2hpdGUiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEgMUg3VjdIMVYxWk0yIDJWNkg2VjJIMlpNMTAgMUgxNlY3SDEwVjFaTTExIDJWNkgxNVYySDExWk0xOSAxSDI4VjdIMTlWMVpNMjAgMlY2SDI3VjJIMjBaTTEgMTBIN1YxNkgxVjEwWk0yIDExVjE1SDZWMTFIMlpNMTkgMTBIMjhWMTZIMTlWMTBaTTIwIDExVjE1SDI3VjExSDIwWk0xMSAxMUgxM1YxM0gxMVYxMVpNMTUgMTFIMTZWMTJIMTVWMTFaTTEwIDEzSDE2VjE0SDEwVjEzWk0xNyAxM0gxOFYxNEgxN1YxM1pNOCAxNUgxMFYxNkg4VjE1Wk0xNSAxNUgxN1YxNkgxNVYxNVpNMSAxOUg3VjI4SDFWMTlaTTIgMjBWMjdINlYyMEgyWk0xMCAxOUgxMVYyMEgxMFYxOVpNMTMgMTlIMTRWMjBIMTNWMTlaTTE2IDE5SDE3VjIwSDE2VjE5Wk0xOSAxOUgyMVYyMEgxOVYxOVpNMjIgMTlIMjRWMjBIMjJWMTlaTTI2IDE5SDI4VjIwSDI2VjE5Wk0xMCAyMUgxM1YyMkgxMFYyMVpNMTUgMjFIMTZWMjJIMTVWMjFaTTE4IDIxSDE5VjIySDE4VjIxWk0yMSAyMUgyMlYyMkgyMVYyMVpNMjQgMjFIMjdWMjJIMjRWMjFaTTggMjNIMTBWMjRIOFYyM1pNMTEgMjNIMTNWMjRIMTFWMjNaTTE0IDIzSDE1VjI0SDE0VjIzWk0xNiAyM0gxOFYyNEgxNlYyM1pNMTkgMjNIMjFWMjRIMTlWMjNaTTIzIDIzSDI2VjI0SDIzVjIzWk0yNyAyM0gyOFYyNEgyN1YyM1pNMTAgMjVIMTJWMjZIMTBWMjVaTTEzIDI1SDE1VjI2SDEzVjI1Wk0xNiAyNUgxN1YyNkgxNlYyNVpNMTggMjVIMTlWMjZIMThWMjVaTTIxIDI1SDI0VjI2SDIxVjI1Wk0yNSAyNUgyNlYyNkgyNVYyNVpNMjcgMjVIMjhWMjZIMjdWMjVaTTggMjdIMTFWMjhIOFYyN1pNMTIgMjdIMTVWMjhIMTJWMjdaTTE2IDI3SDE4VjI4SDE2VjI3Wk0xOSAyN0gyMVYyOEgxOVYyN1pNMjIgMjdIMjNWMjhIMjJWMjdaTTI0IDI3SDI1VjI4SDI0VjI3Wk0yNyAyN0gyOFYyOEgyN1YyN1oiIGZpbGw9ImJsYWNrIi8+PC9zdmc+"
                      alt="PhonePe QR Code" 
                      className="w-48 h-48 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">
                  Scan this QR code with any UPI app to pay ₹{amount}
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  UPI ID
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={upiId}
                    readOnly
                    className="flex-1 bg-gray-50"
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
                  Copy this UPI ID and pay ₹{amount} using any UPI app
                </p>
              </div>
            </div>
          )}

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
