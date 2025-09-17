import RatesPage from "@/Components/Rates/Rates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Rates | Affordable MCO Transportation",
  description:
    "Competitive rates for Orlando Airport Car Service. Transparent pricing for MCO transportation, no hidden fees. Get instant quotes for luxury car service in Orlando.",
  keywords:
    "Orlando Airport Car Service rates, MCO transportation pricing, Orlando car service cost, airport transfer rates Orlando, affordable Orlando limo service, MCO car service prices",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service Rates | Affordable MCO Transportation",
    description:
      "Competitive rates for Orlando Airport Car Service. Transparent pricing for MCO transportation, no hidden fees. Get instant quotes for luxury car service in Orlando.",
    type: "website",
  },
};

export default function ReservationPage() {
  return <RatesPage />;
}
