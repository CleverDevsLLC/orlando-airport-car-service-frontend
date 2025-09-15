import React from "react";
import Navbar from "../Navbar/Navbar";
import FormSections from "@/Components/FormSections/FormSections";
import Cta from "../CTA/Cta";

export default function EventTransportation() {
  return (
    <div>
      <Navbar />
      <FormSections
        topSection="Events include: Private gatherings – Fox Theatre – Mercedes-Benz Stadium – SunTrust Park. Hourly car and limo services available for all types of business, personal, and group event transportation!"
        bottomSection="Limo Service is a premier provider of event transportation, including sporting events, theater and cinema outings, private functions, and more."
        serviceType="Hourly Trip"
      />
      <Cta />
    </div>
  );
}
