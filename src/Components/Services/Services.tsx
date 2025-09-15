"use client";

import Image from "next/image";
import { Plane, Briefcase, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const services = [
  {
    title: "Celebrate Your Birthday in Style",
    description: "Make your special day unforgettable with luxury limos and party buses. Whether it’s a small gathering or a grand celebration, we offer stylish, comfortable transportation to elevate the experience. Enjoy premium amenities, top-tier service, and a worry-free ride while our professional chauffeurs handle the driving. Let us take care of the journey so you can focus on making lifelong memories with friends and family.",
    image: "/images/brd-party.jpg",
    icon: Plane,
  },
  {
    title: "Upgrade Your Office Celebration",
    description: "Make your next corporate event unforgettable with our luxury limo service. Whether it's a holiday party, team outing, or corporate gathering, our elegant fleet offers comfort and style for any group size. Enjoy stress-free transportation with professional chauffeurs, ensuring a seamless and sophisticated experience.",
    image: "/images/office-party.webp",
    icon: Briefcase,
  },
  {
    title: "Luxury Transportation for Your Dream Wedding",
    description: "Your wedding day deserves the finest, and our luxury limo service guarantees a grand entrance and a seamless ride. From the ceremony to the reception, we offer sophisticated transportation tailored to your needs. Select from elegant limousines, sleek sedans, or spacious buses to accommodate your guests in style. With our professional chauffeurs managing every detail, you can unwind and savor every precious moment. Let us bring an extra touch of elegance and comfort to your once-in-a-lifetime celebration.",
    image: "/images/wedding.jpg",
    icon: Users,
  },
  {
    title: "Effortless Luxury Event Transportation",  
    description: "Make a grand entrance with our premium limo service, perfect for any special occasion. Whether it’s a concert, sporting event, or corporate function, we offer reliable and luxurious transportation tailored to your needs. Our professional chauffeurs provide a smooth, stress-free ride, allowing you to focus on enjoying the event. With a diverse fleet of high-end vehicles, we deliver personalized service to make every journey exceptional.",  
    image: "/images/atlanta.avif",
    icon: Users,
  },
];

export default function Services({ showHeading }: { showHeading: boolean }) {
  const router = useRouter();

  <Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((service, index) => ({
          "@type": "Service",
          name: service.title,
          description: service.description,
          image: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${service.image}`,
          provider: {
            "@type": "LocalBusiness",
            name: "Your Business Name",
            url: process.env.NEXT_PUBLIC_WEBSITE_URL,
          },
          serviceType: "Limousine Service",
          areaServed: {
            "@type": "Place",
            name: "United States", // You can update with a more specific region
          },
          position: index + 1,
        })),
      }),
    }}
  />
</Head>
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        {showHeading && (
          <h2 className="mb-12 text-center text-4xl font-bold">Our Services</h2>
        )}

        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              // initial={{ opacity: 0, y: 50 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
            >
              <div className="w-full md:w-1/2">
                <div
                  // whileHover={{ scale: 1.05 }}
                  // transition={{ duration: 0.3 }}
                  className="relative h-64 overflow-hidden rounded-lg shadow-lg md:h-96"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div
                  // initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  // whileInView={{ opacity: 1, x: 0 }}
                  // transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-lg bg-white p-8 shadow-md"
                >
                  <div className="mb-4 flex items-center">
                    <service.icon className="text-primary mr-3 h-8 w-8" />
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    {service.description}
                  </p>

                  <button
                    className="mt-6 rounded-full bg-black px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-gray-800"
                    onClick={() => router.push("/reservation")}
                  >
                    Get A Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
