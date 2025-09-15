// import Navbar from '@/Components/Common/Navbar/Navbar'
import DiscountComponent from "@/Components/Company/DiscountCharges/DiscountCharges";
import DiscountHeader from "@/Components/Company/DiscountCharges/DiscountHeader";
import React from "react";

export default function page() {
  return (
    <div>
      {/* <Navbar/> */}
      <DiscountHeader />
      <DiscountComponent />
    </div>
  );
}
