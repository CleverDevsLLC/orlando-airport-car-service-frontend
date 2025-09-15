"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Users, DollarSign, Car, Check, ChevronDown, ChevronUp } from "lucide-react"
import Head from "next/head"

const vehicles = [
  {
    name: "SUV",
    image: "/images/sub.jpg",
    capacity: "3-6",
    description:
      "A spacious and luxurious SUV designed for group travel. Perfect for airport transfers, corporate events, or family outings, offering both comfort and style.",
    features: [
      "Generous luggage capacity",
      "Premium leather seating",
      "Advanced climate control",
      "Privacy-tinted windows",
      "Convenient USB charging ports",
    ],
    amenities: ["Complimentary bottled water", "Daily newspapers", "Phone charging stations"],
  },
  {
    name: "Luxury Sedan",
    image: "/images/sed-new.png",
    capacity: "1-3",
    description:
      "An elegant and luxurious sedan designed for a refined travel experience. Ideal for business trips, special occasions, or effortless city travel.",
    features: [
      "Baby seats available upon request",
      "Exceptionally smooth ride",
      "High-quality sound system",
      "Complimentary bottled water",
      "Advanced climate control",
    ],
    amenities: ["Curated magazines", "Soft tissues", "Hand sanitizer", "Refreshing mints"],
  },
  {
    name: "Stretch Limo",
    image: "/images/limo-new.png",
    capacity: "4-10",
    description:
      "A luxurious vehicle designed to make every occasion unforgettable. Perfect for weddings, proms, VIP events, or a special night out in style.",
    features: [
      "Spacious seating for 6-15 passengers",
      "Ambient mood lighting",
      "Extra legroom for added comfort",
      "High-end surround sound system",
      "Multiple LCD screens for entertainment",
    ],
    amenities: [
      "Curated magazines",
      "Soft tissues",
      "Hand sanitizer",
      "Refreshing mints",
      "Complimentary bottled water",
    ],
  },
  {
    name: "Van",
    image: "/images/van.webp",
    capacity: "6-15",
    description:
      "A truly magnificent vehicle designed for unforgettable experiences. Perfect for weddings, proms, VIP transportation, or seamless group and family travel.",
    features: [
      "Spacious seating for 6-15 passengers",
      "Ambient mood lighting",
      "Extra legroom for maximum comfort",
      "High-quality surround sound system",
      "Multiple LCD screens for entertainment",
    ],
    amenities: [
      "Curated magazines",
      "Soft tissues",
      "Hand sanitizer",
      "Refreshing mints",
      "Complimentary bottled water",
    ],
  },
]

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
              name: "Your Limo Brand Name"
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
              }
            ],
            offers: {
              "@type": "Offer",
              url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/reservation`,
              priceCurrency: "USD",
              price: "0", // Adjust if pricing is dynamic
              availability: "https://schema.org/InStock"
            }
          })),
        }),
      }}
    />
  </Head>


  return (

    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-medium mb-4">Features</p>
          <h2 className="text-3xl font-bold mb-6">Our Exclusive Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enjoy first-class travel with our luxurious, high-end vehicles designed to meet your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
                  <h3 className="px-4 text-center text-2xl font-bold text-white">{vehicle.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Capacity: {vehicle.capacity} passengers</span>
                  </div>
                  <Car className="h-5 w-5 text-blue-600" />
                </div>

                <p className="mb-4 text-gray-600 leading-relaxed">{vehicle.description}</p>

                <div className="mb-6">
                  <h4 className="mb-3 flex items-center font-semibold text-gray-900">
                    <Check className="mr-2 h-4 w-4 text-blue-600" />
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {vehicle.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4 flex w-full items-center justify-center rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 transition-colors duration-200"
                  onClick={() => router.push("/reservation")}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  View Rates & Reserve
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
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
                          <h4 className="mb-3 font-semibold text-gray-900">Additional Features:</h4>
                          <ul className="space-y-2">
                            {vehicle.features.slice(3).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="mb-3 font-semibold text-gray-900">Complimentary Amenities:</h4>
                        <ul className="space-y-2">
                          {vehicle.amenities.map((amenity, amenityIndex) => (
                            <li key={amenityIndex} className="flex items-center text-sm text-gray-600">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
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
  )
}
