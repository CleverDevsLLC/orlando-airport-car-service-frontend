import ExecutiveTrip from "@/Components/Common/ExecutiveTrip/ExecutiveTrip";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Car Service | Executive Car Service",
  keywords:
    "Limo Service, Los Angeles Car Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};

export default function page() {
  return (
    <div>
      <ExecutiveTrip />
    </div>
  );
}
