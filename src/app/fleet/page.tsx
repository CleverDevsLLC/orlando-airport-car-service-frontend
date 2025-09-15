import React from "react";
import { Metadata } from "next";
import FleetSection from "@/Components/Fleet/FleetUpdated";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";

export const metadata: Metadata = {
  title: "Check out our Fleet of Vehicles",
  keywords:
    "Limo Car Company",
  authors: [{ name: "Limo Car Company Company" }],
};

export default function Fleet() {
  return (
    <>
      <Navbar/>
      <FleetSection />
    </>
  );
}
