import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import ContactSection from "@/Components/Contact/Contact";
import HeroSection from "@/Components/HeroSection/HeroSection";
import PlacesWeServeSection from "@/Components/Places/Places";
import ServicesSection from "@/Components/Services/ServiceUpdated";
import TestimonialsSection from "@/Components/Testimonial/Testimonial";
import WhyChooseUsSection from "@/Components/WhyChooseLimo/WhyChooseUsUpdated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Limo Service, Airport Transportation, Affordable",
  keywords: "Affordable transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service" }],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <TestimonialsSection/>
      <ServicesSection/>
      <WhyChooseUsSection/>
      <PlacesWeServeSection/>
      <ContactSection/>
    </>
  );
}
