"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, link }) => (
  <motion.div
    className="relative h-80 rounded-xl overflow-hidden shadow-lg group"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Image
      src={imageSrc}
      alt={title}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm mb-4">{description}</p>
      <Link href={link} className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors duration-300">
        More Info
      </Link>
    </div>
  </motion.div>
);

const TransportationServices: React.FC = () => {


  const services = [
    {
      title: "Luxury Transportation",
      description: "Reliable rides to and from Hartsfield-Jackson International Airport",
      imageSrc: "/images/trp-1.jpg",
      link: "/atl-airport-transportation"
    },
    {
      title: "Hourly Car Service",
      description: "Ideal for nights out, upscale dining, lively nightlife, and more.",
      imageSrc: "/images/trp-2.jpg",
      link: "/atlanta-hourly-car-service"
    },
    {
      title: "Premium Executive Car Service",
      description: "Meet-and-greet service with a fleet of late-model luxury vehicles.",      
      imageSrc: "/images/thinking.jpg",
      link: "/atlanta-executive-transportation"
    },
    {
      title: "Event & Nightlife Rides",
      description: "Travel to top venues like SunTrust Park, Mercedes-Benz Stadium & Fox Theatre.",
      imageSrc: "/images/trp-3.webp",
      link: "/atlanta-event-transportation"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Luxury Ride Awaits
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransportationServices;

