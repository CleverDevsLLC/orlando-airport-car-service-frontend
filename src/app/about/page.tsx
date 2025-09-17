import { Metadata } from "next";
import About from "@/Components/About/About";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";

export const metadata: Metadata = {
  title: "About Orlando Airport Car Service | Professional Transportation",
  description:
    "Learn about Orlando Airport Car Service - your trusted partner for reliable, professional transportation in Orlando, Florida. Experience, quality, and exceptional service.",
  keywords:
    "About Orlando Airport Car Service, professional transportation Orlando, reliable car service Orlando, Orlando chauffeur company, MCO transportation company",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "About Orlando Airport Car Service | Professional Transportation",
    description:
      "Learn about Orlando Airport Car Service - your trusted partner for reliable, professional transportation in Orlando, Florida. Experience, quality, and exceptional service.",
    type: "website",
  },
};

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <About />
    </>
  );
}
