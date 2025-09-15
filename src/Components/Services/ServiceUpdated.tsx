import Image from "next/image"
import { ArrowRight, Calendar, Heart, Briefcase, Sparkles } from "lucide-react"
import Head from "next/head";

export default function ServicesSection() {
  const services = [
    {
      title: "Celebrate Your Birthday in Style",
      description: "Make your special day unforgettable with luxury limos and party buses.",
      image: "/images/ser-1.png",
      icon: Calendar,
      hoverContent: {
        description:
          "Whether it's a small gathering or a grand celebration, we offer stylish, comfortable transportation to elevate the experience. Enjoy premium amenities, top-tier service, and a worry-free ride while our professional chauffeurs handle the driving. Let us take care of the journey so you can focus on making lifelong memories with friends and family.",
      },
    },
    {
      title: "Transportation for Your Dream Wedding",
      description: "Your wedding day deserves the finest",
      image: "/images/ser-2.png",
      icon: Heart,
      hoverContent: {
        description:
          "Make your wedding day truly magical with our premium transportation services. From elegant bridal party arrivals to grand exits, we ensure every moment is perfect. Our luxury vehicles and professional chauffeurs will help create unforgettable memories on your special day.",
      },
    },
    {
      title: "Upgrade your office celebration",
      description: "Make your next corporate event unforgettable",
      image: "/images/ser-3.png",
      icon: Briefcase,
      hoverContent: {
        description:
          "Elevate your corporate events with our professional transportation services. Whether it's client meetings, company parties, or executive travel, we provide reliable, luxurious transportation that reflects your business's commitment to excellence.",
      },
    },
    {
      title: "Effortless Luxury Event Transportation",
      description: "Make a grand entrance with our premium limo service",
      image: "/images/ser-4.png",
      icon: Sparkles,
      hoverContent: {
        description:
          "Transform any special occasion into an extraordinary experience with our luxury transportation. From galas to premieres, our premium fleet and exceptional service ensure you arrive in style and comfort, making every event memorable.",
      },
    },
  ];
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
            description: service.hoverContent.description || service.description,
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">Services</p>
          <h2 className="text-3xl font-bold mb-6">Reliable Transportation, Tailored for You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We provide safe, punctual, and comfortable rides designed to meet your needs. Whether it&apos;s airport
            transfers, corporate travel, or special events, our professional drivers ensure a seamless journey every
            time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl">
              {/* Default State */}
              <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full bg-gray-100 p-5">
                <div className="mb-6 ">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Hover State - Slides up from bottom */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex flex-col justify-between transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                <div>
                  <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>

                  <p className="text-gray-700 leading-relaxed mb-6">{service.hoverContent.description}</p>
                </div>

                <button className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-200 group/btn">
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
