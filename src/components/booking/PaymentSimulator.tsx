// ============================================
// PAYMENT SIMULATOR COMPONENT
// Simulates payment gateway processing
// ============================================

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CheckCircle2, XCircle } from 'lucide-react';
import type { BookingPricing } from '@/types/booking';

interface PaymentSimulatorProps {
  pricing: BookingPricing;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: () => void;
  onCancel: () => void;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

export function PaymentSimulator({
  pricing,
  onPaymentSuccess,
  onPaymentFailure,
  onCancel,
}: PaymentSimulatorProps) {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [paymentId, setPaymentId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePay = () => {
    setStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      // 90% success rate
      const success = Math.random() < 0.9;
      
      if (success) {
        const id = `PAY_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setPaymentId(id);
        setStatus('success');
      } else {
        setError('Payment declined. Please try again or use a different payment method.');
        setStatus('failed');
      }
    }, 2500);
  };

  // Auto-trigger callback after status change
  useEffect(() => {
    if (status === 'success' && paymentId) {
      const timer = setTimeout(() => {
        onPaymentSuccess(paymentId);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, paymentId, onPaymentSuccess]);

  return (
    <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
      {status === 'idle' && (
        <>
          <CreditCard className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-serif font-medium mb-2">Payment</h2>
          <p className="text-muted-foreground mb-6">
            Complete your booking by making the payment
          </p>
          
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Amount to Pay</div>
            <div className="text-3xl font-bold text-primary">
              ₹{pricing.grandTotal.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              (Includes ₹{pricing.gst.toLocaleString()} GST)
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-4">
            🔒 Secure payment powered by simulated gateway
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePay}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              Pay Now
            </Button>
          </div>
        </>
      )}

      {status === 'processing' && (
        <>
          <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-serif font-medium mb-2">Processing Payment</h2>
          <p className="text-muted-foreground">
            Please wait while we process your payment...
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Do not close this window or press back button
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-medium text-green-600 mb-2">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground mb-4">
            Your payment has been processed successfully.
          </p>
          <div className="bg-green-50 rounded-lg p-3 text-sm">
            <span className="text-muted-foreground">Payment ID: </span>
            <span className="font-mono font-medium">{paymentId}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Redirecting to confirmation...
          </p>
        </>
      )}

      {status === 'failed' && (
        <>
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-medium text-red-600 mb-2">
            Payment Failed
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onPaymentFailure}
              className="flex-1"
            >
              Cancel Booking
            </Button>
            <Button
              onClick={() => {
                setStatus('idle');
                setError('');
              }}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              Try Again
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
