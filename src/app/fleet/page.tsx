import React from "react";
import { Metadata } from "next";
import FleetSection from "@/Components/Fleet/FleetUpdated";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Fleet | Luxury Vehicle Options",
  description:
    "Explore our premium fleet of luxury vehicles for Orlando Airport Car Service. Sedans, SUVs, limousines, and more for comfortable MCO transportation.",
  keywords:
    "Orlando Airport Car Service fleet, luxury vehicles Orlando, MCO transportation vehicles, Orlando limo fleet, airport car service vehicles, luxury sedan Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service Fleet | Luxury Vehicle Options",
    description:
      "Explore our premium fleet of luxury vehicles for Orlando Airport Car Service. Sedans, SUVs, limousines, and more for comfortable MCO transportation.",
    type: "website",
  },
};

export default function Fleet() {
  return (
    <>
      <Navbar />
      <FleetSection />
    </>
  );
}
