import { Metadata } from "next";
import Navbar from "@/Components/Common/Navbar/NavbarUpdated";
import FaqSection from "@/Components/FAQ/FaqUpdated";
import ContactSection from "@/Components/Contact/Contact";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service FAQ | Transportation Questions Answered",
  description:
    "Find answers to common questions about Orlando Airport Car Service. Learn about MCO transportation rates, policies, booking process, and more.",
  keywords:
    "Orlando Airport Car Service FAQ, MCO transportation questions, Orlando car service policies, airport transfer FAQ, Orlando limo service questions",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title:
      "Orlando Airport Car Service FAQ | Transportation Questions Answered",
    description:
      "Find answers to common questions about Orlando Airport Car Service. Learn about MCO transportation rates, policies, booking process, and more.",
    type: "website",
  },
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
