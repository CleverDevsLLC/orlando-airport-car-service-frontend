import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import { API } from "@/Config/Config";
import { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51QSQ4rFWCqHgL0GT6JNozV3YA6lOPLSzb4sV8rtx98i3dgtj0oT1Hp71Czh6oq82sSJk5aBb564Jv9vHzmZiyN5g00N6djIBV5");
// const stripePromise = loadStripe("pk_test_51QRlXGLxyWoPjwq1p9v39e4lza50Cdmn7xreIwkQShoaGkOq1qjZWrHU1jMYfAvyyGgbuGdaUija0rZXhJoibjMS00YqVmJM8z");

interface LeadDetails {
  companyName: string;
  companyEmail: string;
  serviceType: string;
  pickupAddress?: string;
  pickupAirport?: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  numberOfPassengers: string;
  pickupDate: string;
  pickupTime: string;
  price: number;
  _id: string;
}

export default function Payment({ leadDetails, tip }: { leadDetails: LeadDetails; tip: number }) {
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setConfirmed(params.has("payment_intent_client_secret"));
  }, []);

  React.useEffect(() => {
    fetch(`${API.uri}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: tip !== 0 ? leadDetails.price + tip : leadDetails.price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [leadDetails.price, tip]);

  const appearance: StripeElementsOptions['appearance'] = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#4F46E5',
      colorBackground: '#ffffff',
      colorText: '#1E293B',
      colorDanger: '#EF4444',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      '.Input:focus': {
        boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.4)',
      },
    },
  };
  
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-inner">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm price={tip !== 0 ? leadDetails.price + tip : leadDetails.price} id={leadDetails._id}/>}
        </Elements>
      )}
    </div>
  );
}

