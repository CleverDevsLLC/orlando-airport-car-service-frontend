import React from "react";
import Navbar from "../Navbar/Navbar";
import FormSections from "@/Components/FormSections/FormSections";
import Cta from "../CTA/Cta";

export default function ExecutiveTrip() {
  return (
    <div>
      <Navbar />
      <FormSections
        topSection="When reliability and professionalism matter most for your company! Airport transportation and local service available for hourly trips, business travel, parties, and more."
        bottomSection="Corporate clients require a higher level of service that rideshare apps like Uber and Lyft simply can't provide. For a full-time, licensed, and experienced chauffeur delivering premium service, choose our car service today."
        serviceType="One-Way Trip to the Airport"
      />
      <Cta />
    </div>
  );
}
