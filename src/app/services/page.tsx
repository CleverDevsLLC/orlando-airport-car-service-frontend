import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import ContactSection from "@/Components/Contact/Contact";
import ServicesSection from "@/Components/Services/ServiceUpdated";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service | Premium Transportation Services",
  description:
    "Comprehensive Orlando Airport Car Service offering luxury transportation, airport transfers, corporate travel, and special event services in Orlando, Florida.",
  keywords:
    "Orlando Airport Car Service, MCO transportation services, Orlando limo service, airport shuttle Orlando, corporate car service Orlando, event transportation Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service | Premium Transportation Services",
    description:
      "Comprehensive Orlando Airport Car Service offering luxury transportation, airport transfers, corporate travel, and special event services in Orlando, Florida.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
