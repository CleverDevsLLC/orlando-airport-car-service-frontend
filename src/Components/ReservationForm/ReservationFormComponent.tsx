"use client";

import { useEffect } from "react";

type ReservationFormSectionProps = {
  iframeSrc?: string;
  title?: string;
  showHeader?: boolean;
};

export default function ReservationFormComponent({
  iframeSrc = "https://reservation-form-v2-orlando-airport.vercel.app/",
  title = "Request a Quote",
  showHeader = false,
}: ReservationFormSectionProps) {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === "number") {
        const iframe = document.getElementById(
          "formFrame",
        ) as HTMLIFrameElement;
        if (iframe) iframe.style.height = `${e.data}px`;
      }

      if (e.data?.type === "redirect") {
        window.location.href = e.data.url;
      }

      if (e.data?.type === "scrollToForm") {
        const iframe = document.getElementById(
          "formFrame",
        ) as HTMLIFrameElement;
        if (iframe) {
          const iframePosition =
            iframe.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: iframePosition - 110, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {showHeader && (
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            {title}
          </h2>
        )}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg shadow-lg">
          <iframe
            id="formFrame"
            src={iframeSrc}
            title="Reservation Form"
            className="w-full"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
