"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Users,
  DollarSign,
  Car,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Head from "next/head";

const vehicles = [
  {
    name: "LUXURY SEDAN",
    image: "/images/cars/LUXURY SEDAN-3.png",
    capacity: "1-3",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "EXECUTIVE SEDAN",
    image: "/images/cars/EXECUTIVE SEDAN-4.jpg",
    capacity: "1-4",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "LUXURY SUV",
    image: "/images/cars/LUXURY SUV-5.jpg",
    capacity: "1-5",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "EXECUTIVE SUV",
    image: "/images/cars/EXECUTIVE SUV-6.jpg",
    capacity: "1-6",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "LUXURY SUV",
    image: "/images/cars/LUXURY SUV-7.jpg",
    capacity: "1-7",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "LUXURY VAN",
    image: "/images/cars/LUXURY VAN-8.png",
    capacity: "1-8",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: " LUXURY VAN",
    image: "/images/cars/LUXURY VAN-10.png",
    capacity: "1-10",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "HIGH TOP VAN",
    image: "/images/cars/HIGH TOP VAN-14.png",
    capacity: "1-14",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "SPRINTER VAN",
    image: "/images/cars/SPRINTER VAN-11.jpg",
    capacity: "1-11",
    description: "",
    features: [],
    amenities: [],
  },
  {
    name: "SPRINTER VAN",
    image: "/images/cars/SPRINTER VAN-14.jpg",
    capacity: "1-14",
    description: "",
    features: [],
    amenities: [],
  },
];

export default function FleetSection() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: vehicles.map((vehicle, index) => ({
            "@type": "Product",
            name: vehicle.name,
            description: vehicle.description,
            image: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${vehicle.image}`,
            position: index + 1,
            brand: {
              "@type": "Brand",
              name: "Your Limo Brand Name",
            },
            additionalProperty: [
              ...vehicle.features.map((feature) => ({
                "@type": "PropertyValue",
                name: "Feature",
                value: feature,
              })),
              ...vehicle.amenities.map((amenity) => ({
                "@type": "PropertyValue",
                name: "Amenity",
                value: amenity,
              })),
              {
                "@type": "PropertyValue",
                name: "Capacity",
                value: `${vehicle.capacity} passengers`,
              },
            ],
            offers: {
              "@type": "Offer",
              url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reservation`,
              priceCurrency: "USD",
              price: "0", // Adjust if pricing is dynamic
              availability: "https://schema.org/InStock",
            },
          })),
        }),
      }}
    />
  </Head>;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-medium text-blue-600">Features</p>
          <h2 className="mb-6 text-3xl font-bold">Our Exclusive Collection</h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
            Enjoy first-class travel with our luxurious, high-end vehicles
            designed to meet your needs
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="transform overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <h3 className="px-4 text-center text-2xl font-bold text-white">
                    {vehicle.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Capacity: {vehicle.capacity} passengers
                    </span>
                  </div>
                  <Car className="h-5 w-5 text-blue-600" />
                </div>

                <p className="mb-4 leading-relaxed text-gray-600">
                  {vehicle.description}
                </p>

                {(vehicle.features ?? [])?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-3 flex items-center font-semibold text-gray-900">
                      <Check className="mr-2 h-4 w-4 text-blue-600" />
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {vehicle.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4 mt-4 flex w-full items-center justify-center rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-800"
                  onClick={() => router.push("/reservation")}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  View Rates & Reserve
                </motion.button>

                {(vehicle?.features ?? []).length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                    onClick={() =>
                      setExpandedCard(expandedCard === index ? null : index)
                    }
                  >
                    {expandedCard === index ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Less Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        More Details
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-200 pt-4">
                      {vehicle.features.length > 3 && (
                        <div className="mb-4">
                          <h4 className="mb-3 font-semibold text-gray-900">
                            Additional Features:
                          </h4>
                          <ul className="space-y-2">
                            {vehicle.features
                              .slice(3)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="mb-3 font-semibold text-gray-900">
                          Complimentary Amenities:
                        </h4>
                        <ul className="space-y-2">
                          {vehicle.amenities.map((amenity, amenityIndex) => (
                            <li
                              key={amenityIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
