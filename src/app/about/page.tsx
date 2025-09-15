import { Metadata } from "next";
import About from "@/Components/About/About";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";

export const metadata: Metadata = {
  title: "About",
  keywords:
    "Limo Service, Los Angeles Car Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <About />
    </>
  );
}
