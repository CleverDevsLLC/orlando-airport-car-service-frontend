import Cta from "@/Components/Common/CTA/Cta";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import PrivacyPolicy from "@/Components/Privacy/Privacy";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <PrivacyPolicy />
      <Cta />
    </div>
  );
}
