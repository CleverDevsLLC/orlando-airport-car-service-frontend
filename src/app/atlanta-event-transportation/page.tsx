import EventTransportation from "@/Components/Common/EventTransportation/EventTransportation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Event Transportation | Transportation Services",
  keywords:
    "Limo Service, Los Angeles Car Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};

export default function page() {
  return (
    <div>
      <EventTransportation />
    </div>
  );
}
