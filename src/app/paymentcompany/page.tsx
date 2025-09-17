import React, { Suspense } from "react";
import Billing_1 from "./Payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Company Payment | Corporate Billing",
  description:
    "Corporate payment portal for Orlando Airport Car Service. Secure billing for business MCO transportation and corporate car service accounts.",
  keywords:
    "Orlando Airport Car Service corporate payment, business MCO transportation billing, company car service payment",
  authors: [{ name: "Orlando Airport Car Service" }],
  robots: "noindex, nofollow",
};

export default function page() {
  return (
    <Suspense>
      <Billing_1 />
    </Suspense>
  );
}
