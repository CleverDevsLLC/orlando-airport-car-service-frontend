import React, { Suspense } from "react";
import ThankYouPage from "./ThankYouMain";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Orlando Airport Car Service Booking Confirmed",
  description:
    "Thank you for choosing Orlando Airport Car Service. Your MCO transportation booking has been confirmed. We look forward to serving you.",
  keywords:
    "Orlando Airport Car Service confirmation, MCO transportation booking confirmed, thank you page",
  authors: [{ name: "Orlando Airport Car Service" }],
  robots: "noindex, nofollow",
};

export default function Thanks() {
  return (
    <>
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-16850097961/yr7xCMCMx5kaEKmu4OI-',
            'value': 1.0,
            'currency': 'USD'
          });
        `}
      </Script>
      <Suspense fallback={<div>Loading...</div>}>
        <ThankYouPage />
      </Suspense>
    </>
  );
}
