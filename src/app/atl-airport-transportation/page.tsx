import AtlAirportTransportation from "@/Components/Common/Atl-airport-transportation/Atl-Airport-Transportation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Airport Transportation | MCO Car Service & Transfers",
  description:
    "Professional Orlando Airport Transportation to/from MCO. Reliable, comfortable, and affordable car service with experienced chauffeurs and luxury vehicles.",
  keywords:
    "Orlando Airport Transportation, MCO car service, Orlando airport transfers, MCO transportation, airport shuttle Orlando, Orlando airport car service",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Transportation | MCO Car Service & Transfers",
    description:
      "Professional Orlando Airport Transportation to/from MCO. Reliable, comfortable, and affordable car service with experienced chauffeurs and luxury vehicles.",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <AtlAirportTransportation />
    </div>
  );
}
