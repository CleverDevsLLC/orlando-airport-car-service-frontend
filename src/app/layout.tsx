import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/Components/Common/Footer/Footer";
import BackToTop from "@/Components/BackToTop/BackToTop";
import { ToastContainer } from "react-toastify";

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
      <body>
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
