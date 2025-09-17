import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import ContactSection from "@/Components/Contact/Contact";
import HeroSection from "@/Components/HeroSection/HeroSection";
import PlacesWeServeSection from "@/Components/Places/Places";
import ServicesSection from "@/Components/Services/ServiceUpdated";
import TestimonialsSection from "@/Components/Testimonial/Testimonial";
import WhyChooseUsSection from "@/Components/WhyChooseLimo/WhyChooseUsUpdated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service | MCO Transportation & Limo Service",
  description:
    "Premium Orlando Airport Car Service providing reliable transportation to/from MCO. Professional chauffeurs, luxury vehicles, and competitive rates for Orlando airport transfers.",
  keywords:
    "Orlando Airport Car Service, MCO car service, Orlando airport transportation, MCO limo service, airport shuttle Orlando, luxury transportation Orlando, Orlando airport transfer",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service | MCO Transportation & Limo Service",
    description:
      "Premium Orlando Airport Car Service providing reliable transportation to/from MCO. Professional chauffeurs, luxury vehicles, and competitive rates for Orlando airport transfers.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PlacesWeServeSection />
      <ContactSection />
    </>
  );
}
