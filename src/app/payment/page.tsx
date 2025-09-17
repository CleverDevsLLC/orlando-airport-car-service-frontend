import React, { Suspense } from "react";
import Billing from "./Payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Payment | Secure Booking Payment",
  description:
    "Secure payment page for Orlando Airport Car Service. Complete your MCO transportation booking with our safe and reliable payment system.",
  keywords:
    "Orlando Airport Car Service payment, MCO transportation payment, secure car service booking, Orlando limo payment",
  authors: [{ name: "Orlando Airport Car Service" }],
  robots: "noindex, nofollow",
};

export default function page() {
  return (
    <Suspense>
      <Billing />
    </Suspense>
  );
}
