// import Navbar from "@/Components/Common/Navbar/Navbar";
import AdditionalChargesComponent from "@/Components/Company/AdditionalCharges/AdditionalCharges";
import ChargesHeader from "@/Components/Company/AdditionalCharges/ChargesHeader";
import React from "react";

export default function page() {
  return (
    <div>
      {/* <Navbar/> */}
      <ChargesHeader />
      <AdditionalChargesComponent />
    </div>
  );
}
