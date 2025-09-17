import React, { Suspense } from "react";
import Stripe from "./Stripe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Stripe Payment | Secure Checkout",
  description:
    "Secure Stripe payment processing for Orlando Airport Car Service. Complete your MCO transportation booking with encrypted payment protection.",
  keywords:
    "Orlando Airport Car Service stripe payment, secure MCO transportation payment, encrypted car service booking",
  authors: [{ name: "Orlando Airport Car Service" }],
  robots: "noindex, nofollow",
};

export default function page() {
  return (
    <Suspense>
      <Stripe />
    </Suspense>
  );
}
