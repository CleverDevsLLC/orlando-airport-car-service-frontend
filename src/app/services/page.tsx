import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import ContactSection from "@/Components/Contact/Contact";
import ServicesSection from "@/Components/Services/ServiceUpdated";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Services",
  keywords:
    "Limo Service transportation, rates, policies, reservations, Services",
  authors: [{ name: "Limo Service" }],
};

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <ServicesSection/>
      <ContactSection/>
    </div>
  );
}
