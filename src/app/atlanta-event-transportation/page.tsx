import EventTransportation from "@/Components/Common/EventTransportation/EventTransportation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Event Transportation | Special Occasion Car Service",
  description:
    "Premium Orlando Event Transportation for weddings, parties, and special occasions. Luxury vehicles and professional service for memorable events in Orlando, Florida.",
  keywords:
    "Orlando Event Transportation, wedding transportation Orlando, party car service Orlando, special occasion transportation, Orlando limo service, event car service Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Event Transportation | Special Occasion Car Service",
    description:
      "Premium Orlando Event Transportation for weddings, parties, and special occasions. Luxury vehicles and professional service for memorable events in Orlando, Florida.",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <EventTransportation />
    </div>
  );
}
