import HourlyTrip from "@/Components/Common/HourlyTrip/HourlyTrip";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Car Rentals| Car Rentals Georgia",
  keywords:
    "Limo Service, Los Angeles Car Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};
export default function page() {
  return (
    <div>
      <HourlyTrip />
    </div>
  );
}
