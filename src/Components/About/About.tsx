import type React from "react"
import { MapPin, Phone, Mail, Clock, Award, Users, Car, Shield, ExternalLink, FileQuestion } from "lucide-react"
import Link from "next/link"

const AboutUs: React.FC = () => {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "10,000+" },
    { icon: Car, label: "Fleet Vehicles", value: "50+" },
    { icon: Award, label: "Years Experience", value: "18+" },
    { icon: Shield, label: "Safety Rating", value: "5-Star" },
  ]

  const values = [
    {
      icon: Clock,
      title: "Punctuality",
      description: "We value your time and ensure prompt, reliable service for every journey.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All our vehicles are regularly maintained and our drivers are professionally trained.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from booking to destination.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your comfort and satisfaction are our top priorities in everything we do.",
    },
  ]

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">About Us</p>
          <h2 className="text-3xl font-bold mb-6">Your Trusted Transportation Partner</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Providing premium transportation services to the surrounding areas with unmatched reliability and luxury
            since 2005.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2005, we began with a simple mission: to provide reliable, luxurious transportation that
                exceeds expectations. What started as a small family business has grown into one of the region&apos;s most
                trusted transportation services.
              </p>
              <p>
                Over the years, we&apos;ve built our reputation on punctuality, professionalism, and personalized service.
                Our commitment to excellence has earned us the trust of thousands of clients, from business executives
                to families celebrating special occasions.
              </p>
              <p>
                Today, we operate a modern fleet of luxury vehicles and employ a team of professional chauffeurs who
                share our dedication to providing exceptional service on every journey.
              </p>
            </div>
          </div>

          {/* Services Overview */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">What We Offer</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Airport Transfers</h4>
                  <p className="text-gray-600 text-sm">
                    Reliable transportation to and from all major airports with flight monitoring.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Corporate Travel</h4>
                  <p className="text-gray-600 text-sm">
                    Professional transportation for business meetings, events, and executive travel.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Special Events</h4>
                  <p className="text-gray-600 text-sm">
                    Luxury transportation for weddings, proms, parties, and celebrations.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">City Tours</h4>
                  <p className="text-gray-600 text-sm">
                    Comfortable sightseeing and city exploration with knowledgeable drivers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl shadow-lg bg-white">
                <div className="w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-gray-900">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Quick Links */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-blue-600" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Our Location</p>
                  <p className="text-gray-600">3131 Piedmont Rd NE, GA 30305</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:+14044595749" className="text-blue-600 hover:text-blue-700">
                    (404) 459-5749
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info@limoservice.com" className="text-blue-600 hover:text-blue-700">
                    info@limoservice.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">24/7 Service Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Quick Links</h3>
            <div className="space-y-4">
              <Link
                href="/reservation"
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">Make a Reservation</p>
                  <p className="text-sm text-gray-600">Book your ride online instantly</p>
                </div>
              </Link>

              <Link
                href="/faq"
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                  <FileQuestion className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">Frequently Asked Questions</p>
                  <p className="text-sm text-gray-600">Find answers to common questions</p>
                </div>
              </Link>

              <Link
                href="/fleet"
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center mr-4">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">View Our Fleet</p>
                  <p className="text-sm text-gray-600">Explore our luxury vehicles</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
