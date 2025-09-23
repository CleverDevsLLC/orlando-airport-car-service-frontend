import type React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  Car,
  Shield,
  ExternalLink,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";

const AboutUs: React.FC = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "10,000+" },
    { icon: Car, label: "Fleet Vehicles", value: "50+" },
    { icon: Award, label: "Years Experience", value: "18+" },
    { icon: Shield, label: "Safety Rating", value: "5-Star" },
  ];

  const values = [
    {
      icon: Clock,
      title: "Punctuality",
      description:
        "We value your time and ensure prompt, reliable service for every journey.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "All our vehicles are regularly maintained and our drivers are professionally trained.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from booking to destination.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Your comfort and satisfaction are our top priorities in everything we do.",
    },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-medium text-blue-600">About Us</p>
          <h2 className="mb-6 text-3xl font-bold">
            Your Trusted Transportation Partner
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
            Providing premium transportation services to the surrounding areas
            with unmatched reliability and luxury since 2005.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-2xl bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="mb-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mb-16 grid gap-12 md:grid-cols-2">
          {/* Company Story */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Story</h3>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Founded in 2005, we began with a simple mission: to provide
                reliable, luxurious transportation that exceeds expectations.
                What started as a small family business has grown into one of
                the region&apos;s most trusted transportation services.
              </p>
              <p>
                Over the years, we&apos;ve built our reputation on punctuality,
                professionalism, and personalized service. Our commitment to
                excellence has earned us the trust of thousands of clients, from
                business executives to families celebrating special occasions.
              </p>
              <p>
                Today, we operate a modern fleet of luxury vehicles and employ a
                team of professional chauffeurs who share our dedication to
                providing exceptional service on every journey.
              </p>
            </div>
          </div>

          {/* Services Overview */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              What We Offer
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Airport Transfers
                  </h4>
                  <p className="text-sm text-gray-600">
                    Reliable transportation to and from all major airports with
                    flight monitoring.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Corporate Travel
                  </h4>
                  <p className="text-sm text-gray-600">
                    Professional transportation for business meetings, events,
                    and executive travel.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Special Events
                  </h4>
                  <p className="text-sm text-gray-600">
                    Luxury transportation for weddings, proms, parties, and
                    celebrations.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    City Tours
                  </h4>
                  <p className="text-sm text-gray-600">
                    Comfortable sightseeing and city exploration with
                    knowledgeable drivers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Our Values
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-300">
                  <value.icon className="h-6 w-6 text-gray-700" />
                </div>
                <h4 className="mb-3 text-lg font-bold text-gray-900">
                  {value.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Quick Links */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <MapPin className="mr-3 h-6 w-6 text-blue-600" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Our Location</p>
                  <p className="text-gray-600">1718 Hughey, Orlando, FL</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <div className="flex flex-col">
                    <a
                      href="tel:+14073445566"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      (407) 344-5566
                    </a>
                    <a
                      href="tel:+18886288883"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      (888) 628-8883
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:info@limoservice.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    book@orlandosedanexpress.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 mt-0.5 h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">24/7 Service Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              Quick Links
            </h3>
            <div className="space-y-4">
              <Link
                href="/reservation"
                className="group flex items-center rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                    Make a Reservation
                  </p>
                  <p className="text-sm text-gray-600">
                    Book your ride online instantly
                  </p>
                </div>
              </Link>

              <Link
                href="/faq"
                className="group flex items-center rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
                  <FileQuestion className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                    Frequently Asked Questions
                  </p>
                  <p className="text-sm text-gray-600">
                    Find answers to common questions
                  </p>
                </div>
              </Link>

              <Link
                href="/fleet"
                className="group flex items-center rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                    View Our Fleet
                  </p>
                  <p className="text-sm text-gray-600">
                    Explore our luxury vehicles
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
