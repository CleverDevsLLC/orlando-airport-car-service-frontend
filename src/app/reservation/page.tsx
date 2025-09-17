import ReservationMain from "@/Components/Reservations/ReservationMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Airport Car Service Reservations | Book MCO Transportation",
  description:
    "Book your Orlando Airport Car Service reservation online. Easy booking for MCO transportation, instant quotes, and reliable service to/from Orlando International Airport.",
  keywords:
    "Orlando Airport Car Service reservations, book MCO transportation, Orlando car service booking, airport transfer reservations, Orlando limo booking, MCO car service quotes",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service Reservations | Book MCO Transportation",
    description:
      "Book your Orlando Airport Car Service reservation online. Easy booking for MCO transportation, instant quotes, and reliable service to/from Orlando International Airport.",
    type: "website",
  },
};

export default function ReservationPage() {
  return <ReservationMain />;
}
