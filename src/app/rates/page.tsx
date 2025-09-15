import RatesPage from '@/Components/Rates/Rates'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LAX Car Service to Palm Springs California, Affordable Limo Service to LAX",
  keywords:
    "Affordable Town Car, Los Angeles Car Service, transportation, rates, policies, reservations, LAX Car Service to Palm Springs California, Affordable Limo Service to LAX",
  authors: [{ name: "Affordable Town Car Company" }],
};


export default function ReservationPage() {
  return (
    <RatesPage/>
  )
}

