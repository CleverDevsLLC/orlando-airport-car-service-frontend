import Cta from "@/Components/Common/CTA/Cta";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import PrivacyPolicy from "@/Components/Privacy/Privacy";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Privacy Policy | Data Protection",
  description:
    "Privacy Policy for Orlando Airport Car Service. Learn how we protect your personal information and ensure secure MCO transportation booking.",
  keywords:
    "Orlando Airport Car Service privacy policy, data protection, MCO transportation privacy, secure booking Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service Privacy Policy | Data Protection",
    description:
      "Privacy Policy for Orlando Airport Car Service. Learn how we protect your personal information and ensure secure MCO transportation booking.",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <Navbar />
      <PrivacyPolicy />
      <Cta />
    </div>
  );
}
