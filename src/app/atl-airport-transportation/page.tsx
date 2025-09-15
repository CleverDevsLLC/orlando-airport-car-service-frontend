import AtlAirportTransportation from "@/Components/Common/Atl-airport-transportation/Atl-Airport-Transportation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Airport Transportation Ga | Car Service",
  keywords:
    "Limo Service, Los Angeles Car Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};

export default function page() {
  return (
    <div>
      <AtlAirportTransportation />
    </div>
  );
}
