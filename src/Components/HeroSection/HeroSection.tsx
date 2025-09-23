"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Handle iframe height adjustment (when message is a number)
      if (typeof e.data === "number") {
        const iframe = document.getElementById(
          "formFrame",
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.style.height = `${e.data}px`;
        }
      }

      // Handle redirect messages (when message is an object with type 'redirect')
      if (e.data && typeof e.data === "object" && e.data.type === "redirect") {
        window.location.href = e.data.url;
      }

      // Handle scroll requests (when message is an object with type 'scrollToForm')
      if (
        e.data &&
        typeof e.data === "object" &&
        e.data.type === "scrollToForm"
      ) {
        const iframe = document.getElementById(
          "formFrame",
        ) as HTMLIFrameElement;
        if (iframe) {
          // Scroll to the top of the iframe with a small offset
          const iframePosition =
            iframe.getBoundingClientRect().top + window.pageYOffset;
          const scrollToPosition = iframePosition - 110; // 50px offset from the top
          window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("message", handleMessage, false);

    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-8 pr-4 md:mb-0 md:w-1/2 lg:w-3/5">
            <h1 className="main-heading mb-4 text-[22px] font-bold sm:text-4xl">
              Welcome to{" "}
              <span className="text-blue-700">Orlando Airport Car Service</span>{" "}
            </h1>
            <p className="main-para mb-6 text-gray-600">
              As Orlando&apos;s premier luxury transportation company, we
              specialize in providing seamless airport car service, executive
              transportation, and chauffeur-driven experiences for discerning
              clients.
            </p>
            <div className="hero-btn-section">
              <Link
                href="/reservation"
                className="hero-btn inline-block rounded-md bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800"
              >
                Get a Quote
              </Link>
            </div>
          </div>
          <div className="form-container">
            <div className="rounded-lg bg-white shadow-lg sm:p-0">
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              {/* <iframe id="formFrame" src="http://localhost:3000/"></iframe> */}
              <iframe
                id="formFrame"
                src="https://reservation-form-v2-orlando-airport.vercel.app/"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
