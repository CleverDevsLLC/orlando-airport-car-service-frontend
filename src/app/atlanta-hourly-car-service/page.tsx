import HourlyTrip from "@/Components/Common/HourlyTrip/HourlyTrip";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orlando Hourly Car Service | Flexible Transportation Rentals",
  description:
    "Orlando Hourly Car Service offering flexible transportation solutions. Perfect for business meetings, city tours, and extended travel needs in Orlando, Florida.",
  keywords:
    "Orlando Hourly Car Service, hourly transportation Orlando, car rental Orlando, flexible car service Orlando, Orlando chauffeur service, hourly limo Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Hourly Car Service | Flexible Transportation Rentals",
    description:
      "Orlando Hourly Car Service offering flexible transportation solutions. Perfect for business meetings, city tours, and extended travel needs in Orlando, Florida.",
    type: "website",
  },
};
export default function page() {
  return (
    <div>
      <HourlyTrip />
    </div>
  );
}
