import ReservationMain from "@/Components/Reservations/ReservationMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes/Reservations",
  keywords: "Limo Service",
  authors: [{ name: "Limo Service" }],
};

export default function ReservationPage() {
  return <ReservationMain />;
}
