import React, { Suspense } from "react";
import ThankYouPage from "./ThankYouMain";
import Script from "next/script";

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
