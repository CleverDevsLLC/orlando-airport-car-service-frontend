"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  RotateCcw,
  Ban,
  FileText,
  Calendar,
  Car,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function FaqSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs = [
    {
      icon: Heart,
      question: "How do I book a ride?",
      answer:
        "You can book directly through our website by selecting your pickup and drop-off locations, choosing a vehicle, and confirming your ride details.",
    },
    {
      icon: RotateCcw,
      question: "What types of vehicles are available?",
      answer:
        "Our fleet includes luxury sedans, black SUVs, minivans, and 10-passenger vans to accommodate different group sizes and occasions.",
    },
    {
      icon: Ban,
      question: "Is there a cancellation fee?",
      answer:
        "Cancellations made at least 24 hours in advance are fully refundable. Last-minute cancellations may incur a fee based on the vehicle type and time reserved.",
    },
    {
      icon: FileText,
      question: "Can I make changes to my reservation?",
      answer:
        "Yes, you can modify your booking up to 24 hours before your scheduled pickup. Contact our support team for any changes.",
    },
    {
      icon: Calendar,
      question: "Do you provide airport pickups and drop-offs?",
      answer:
        "Yes! We service all major airports in the area, including Orlando International Airport, Sanford Airport, and other regional airports.. We monitor flight times to ensure prompt pickup—even if your flight is early or delayed.",
    },
    {
      icon: Car,
      question: "Are your drivers licensed and insured?",
      answer:
        "Yes, all our chauffeurs are professionally trained, background-checked, and fully insured for your safety and peace of mind.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-medium text-blue-600">FAQs</p>
          <h2 className="mb-6 text-4xl font-bold">
            Frequently asked questions
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Have questions? We&apos;re here to help.
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Desktop FAQ Grid */}
        <div className="mb-16 hidden gap-8 md:grid md:grid-cols-3">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center">
                <faq.icon className="h-8 w-8 text-gray-600" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {faq.question}
              </h3>
              <p className="leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Mobile FAQ Accordion */}
        <div className="mb-16 md:hidden">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <div className="flex items-center">
                    <faq.icon
                      className="mr-3 h-5 w-5 text-gray-600"
                      strokeWidth={1.5}
                    />
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
