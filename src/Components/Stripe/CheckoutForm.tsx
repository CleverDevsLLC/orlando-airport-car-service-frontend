import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { CreditCard, Info } from 'lucide-react';
import { StripePaymentElementOptions } from "@stripe/stripe-js";

export default function CheckoutForm({ price, id }: { price: number; id: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://payment-1-nine.vercel.app/confirmation?id=${id}`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || !stripe || !elements} 
        id="submit" 
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `$${price}`}
        </span>
      </motion.button>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          id="payment-message" 
          className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg flex items-start"
        >
          <Info className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        id="dpm-annotation" 
        className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg"
      >
      </motion.div>
    </form>
  );
}

