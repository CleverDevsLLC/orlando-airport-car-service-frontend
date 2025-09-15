import { Metadata } from "next";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import FaqSection from "@/Components/FAQ/FaqUpdated";
import ContactSection from "@/Components/Contact/Contact";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about Limo Services. Learn about rates, policies, and more.",
  keywords: "FAQs, Limo Service, transportation, rates, policies, reservations",
  authors: [{ name: "Limo Service Company" }],
};
function FAQ() {
  return (
    <>
      <Navbar />
      <FaqSection />
      <ContactSection />
    </>
  );
}

export default FAQ;
