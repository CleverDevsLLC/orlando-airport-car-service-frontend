"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How can I book a ride through your service?",
    answer:
      "Use our online 'Request a Quote' or 'Make a Reservation' form to check pricing, select vehicles, confirm availability, and complete your booking. You can also request a call-back if needed.",
  },
  {
    question: "How can I check rates?",
    answer:
      "Simply fill out the 'Request a Quote' form on our website. An exclusive 10% discount is available for online quote requests but does not apply to phone reservations. (Discount may not apply to revised rates.)",
  },
  {
    question: "What does the quoted rate include?",
    answer:
      "Our pricing is transparent with no hidden fees. Your quote includes all charges, such as a 20% gratuity and applicable taxes. We do NOT add fuel surcharges, passenger fees, or unexpected extras. For stretch limos and SUVs, bottled water and ice are included at no extra cost.\n\nAdditional charges may apply for:\n- Extra stops requested by the customer\n- Waiting time due to customer delays\n- Any unusual vehicle damage beyond normal wear and tear",
  },
  {
    question: "What is your gratuity policy?",
    answer: "A 20% tip is automatically included in your final price.",
  },
  {
    question: "Are there fees for extra stops?",
    answer:
      "Policies for extra stops are as follows:\n\n1. Hourly bookings allow unlimited stops within the reserved time at no extra cost.\n2. For other trips (one-way, round trips):\n   - Pre-planned stops mentioned in the reservation form are included in your quote.\n   - Unplanned stops may result in additional charges, payable directly to the driver.\n   - The driver may decline unexpected stops or apply fees of $25 to $50 per stop, depending on the vehicle.",
  },
  {
    question: "What are the charges for delays or late arrivals?",
    answer:
      "If you arrive late, you may be charged a waiting fee:\n- More than 30 minutes late for airport pickups: $50 (sedans), $90-$95 (larger vehicles) per hour or fraction thereof.\n- More than 10 minutes late for non-airport pickups: The same waiting fees apply.\n- If you are over 60 minutes late, we reserve the right to cancel the pickup with no refund. However, please contact us, as partial refunds may be considered in certain cases.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "For cancellations made more than 72 hours in advance, we issue a refund minus a cancellation fee (either $25 or 50% of the total fare, whichever is higher). Cancellations within 72 hours may not be eligible for a refund, but please contact us to discuss possible partial refunds.",
  },
  {
    question: "How do I pay for my ride?",
    answer:
      "Payment is made directly to the service provider handling your booking. Accepted payment methods include cash, Visa, MasterCard, American Express, Discover, and PayPal.",
  },
  {
    question: "Can I pay with a PayPal eCheck?",
    answer: "Yes, but your eCheck must clear at least three days before your ride.",
  },
  {
    question: "Can I get a reminder call for my pickup?",
    answer:
      "Yes! We offer courtesy reminder calls before your scheduled pickup. You can request this service when finalizing your reservation.",
  },
  {
    question: "What types of vehicles do you offer?",
    answer: "We provide luxury sedans, town cars, SUVs, stretch limousines, and more.",
  },
  {
    question: "How many passengers can fit in each vehicle?",
    answer:
      "The seating capacity varies based on the vehicle type. A sedan typically fits up to three passengers. However, if you have extra luggage, you may need a larger vehicle.",
  },
  {
    question: "When should I book my ride?",
    answer:
      "You can book anytime, but we recommend making a reservation at least 24 hours in advance to ensure availability.",
  },
  {
    question: "When can I get picked up?",
    answer: "Our service operates 24/7, so you can schedule a pickup anytime.",
  },
  {
    question: "What trip options do you offer?",
    answer:
      "We provide one-way and round-trip services, including airport and non-airport transportation, as well as hourly rentals for flexible travel plans.",
  },
  {
    question: "Where can I request pickup and drop-off?",
    answer:
      "You can request pickup and drop-off at specific addresses, such as hotels, businesses, or private residences. When booking online, we service multiple locations across various states.",
  },
  {
    question: "How do airport pickups work?",
    answer:
      "For added convenience, we offer a Meet & Greet service at baggage claim for a small additional fee ($7.99 for domestic flights, $15.99 for international flights). Otherwise, you can call the driver upon arrival for curbside pickup.",
  },
  {
    question: "What flight details do I need to provide?",
    answer:
      "For airport pickups, include your airline, flight number, and arrival time (e.g., 'American Airlines Flight #1020, Arriving at 5:25 PM'). This ensures timely service.",
  },
  {
    question: "What is your alcohol and drug policy?",
    answer:
      "Alcohol is prohibited in the vehicle if any passenger is under 21. Illegal drugs are strictly prohibited. Violations will result in immediate termination of service without a refund.",
  },
  {
    question: "What happens if I lose an item in the vehicle?",
    answer:
      "We are not responsible for lost items, but if you leave something behind, contact us immediately, and we will return it if found.",
  },
  {
    question: "Are rate quotes guaranteed?",
    answer:
      "Your rate is confirmed only after payment is received and you receive an email confirmation stating your reservation is 'CONFIRMED.' We are not responsible for typographical errors in pricing before confirmation.",
  },
  {
    question: "What is your liability policy?",
    answer:
      "Our liability is limited to the refund of any amount paid for transportation. We are not responsible for delays, missed flights, or other unforeseen circumstances unless required by law.",
  },
];


const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
            Essential FAQs for Your Convenience
          </h1>
          <p className="mb-8 text-center text-xl text-gray-600">
            Everything You Need to Know About Our Services
          </p>

          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-1 focus:ring-blue-500 focus-visible:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4">
                        <p className="whitespace-pre-line text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
    </>
  );
};

export default FAQ;
