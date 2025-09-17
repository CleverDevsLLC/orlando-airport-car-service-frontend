import ExecutiveTrip from "@/Components/Common/ExecutiveTrip/ExecutiveTrip";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Executive Car Service | Corporate Transportation",
  description:
    "Premium Orlando Executive Car Service for business professionals. Reliable corporate transportation with luxury vehicles and professional chauffeurs in Orlando, Florida.",
  keywords:
    "Orlando Executive Car Service, corporate transportation Orlando, business car service Orlando, executive transportation Orlando, professional chauffeur Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Executive Car Service | Corporate Transportation",
    description:
      "Premium Orlando Executive Car Service for business professionals. Reliable corporate transportation with luxury vehicles and professional chauffeurs in Orlando, Florida.",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <ExecutiveTrip />
    </div>
  );
}
