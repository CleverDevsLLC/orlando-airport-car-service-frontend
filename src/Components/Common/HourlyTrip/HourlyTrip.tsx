import React from "react";
import Navbar from "../Navbar/Navbar";
import FormSections from "@/Components/FormSections/FormSections";
import Cta from "../CTA/Cta";

export default function HourlyTrip() {
  return (
    <div>
      <Navbar />
      <FormSections
        topSection="Hourly services include: Birthday limos, office party transportation, wedding limo and car services, and more. Offering reliable hourly car and limo service for business, personal, and group events."
        bottomSection="Limo Service is a premier provider of luxury hourly transportation."
        serviceType="Hourly Trip"
      />
      <Cta />
    </div>
  );
}
