// app/layout.tsx
// -------------------------------------------------------------
// Google Tag Manager for Next.js App Router (layout-only setup)
// - Loads GTM asynchronously via next/script (non-blocking)
// - Includes required <noscript> fallback early in <body>
// - No client components or hooks needed
// - For SPA pageviews, configure GTM "History Change" trigger (notes below)

import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/Components/Common/Footer/Footer";
import BackToTop from "@/Components/BackToTop/BackToTop";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

// Not secret; from your dev snippet
const GTM_ID = "GTM-W5T9BDBR" as const;

export const metadata: Metadata = {
  title: "Orlando Airport Car Service | Premium Transportation to MCO",
  description:
    "Professional Orlando Airport Car Service offering luxury transportation to/from MCO. Reliable, punctual, and affordable limousine service in Orlando, Florida.",
  keywords:
    "Orlando Airport Car Service, MCO transportation, Orlando limo service, airport shuttle Orlando, luxury car service Orlando",
  authors: [{ name: "Orlando Airport Car Service" }],
  openGraph: {
    title: "Orlando Airport Car Service | Premium Transportation to MCO",
    description:
      "Professional Orlando Airport Car Service offering luxury transportation to/from MCO. Reliable, punctual, and affordable limousine service in Orlando, Florida.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GTM loader (same as your dev’s snippet, but injected safely after hydration) */}
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>

      <body>
        {/* Required <noscript> fallback (must be early in <body>) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <main className="container relative mx-auto max-w-[1400px] p-2">
          {/* <ReviewButton/> */}
          <BackToTop />
          {children}
          <ToastContainer />
          <Footer />
        </main>
      </body>
    </html>
  );
}
