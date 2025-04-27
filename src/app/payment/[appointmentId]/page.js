'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { FaArrowLeft } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const mockAppointmentDetails = {
  specialist: 'Dr. Sarah Johnson',
  service: 'Cardiology',
  date: '2024-03-20',
  time: '10:00 AM',
  mode: 'in-person',
  amount: 150.00
};

export default function PaymentPage({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { appointmentId } = params;

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      // Mock API call to create payment intent
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: mockAppointmentDetails.amount * 100, // Convert to cents
          appointmentId,
        }),
      });

      const { clientSecret } = await response.json();

      // Mock successful payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Payment successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-40"
      >
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Payment</h1>
      </motion.header>

      {/* Payment Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 space-y-6"
      >
        {/* Appointment Summary */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Appointment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Specialist</span>
                <span className="font-medium">{mockAppointmentDetails.specialist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{mockAppointmentDetails.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{mockAppointmentDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{mockAppointmentDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium capitalize">{mockAppointmentDetails.mode}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-semibold">${mockAppointmentDetails.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  For testing purposes, use the following card details:
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">Card Number: 4242 4242 4242 4242</p>
                  <p className="text-sm">Expiry: Any future date</p>
                  <p className="text-sm">CVC: Any 3 digits</p>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}