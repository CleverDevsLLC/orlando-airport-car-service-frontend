import { Building2, BookOpen, Globe } from "lucide-react"

export default function PlacesWeServeSection() {
  const serviceAreas = [
    {
      title: "Cities & Towns",
      icon: <Building2 className="w-6 h-6 text-gray-700" />,
      locations: [
        "East Northport, NY",
        "Northport, NY",
        "Port Jefferson, NY",
        "Babylon, NY",
        "Holbrook, NY",
        "Islip, NY",
        "New York City",
      ],
    },
    {
      title: "Counties & Regions",
      icon: <BookOpen className="w-6 h-6 text-gray-700" />,
      locations: ["Westchester County, NY", "New Jersey", "Connecticut", "New York State"],
    },
    {
      title: "General Region",
      icon: <Globe className="w-6 h-6 text-gray-700" />,
      locations: ["Tri-State Area (NY, NJ, CT)"],
    },
  ]

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-300 font-medium mb-4">Our values</p>
          <h2 className="text-4xl font-bold mb-12">Places We Serve</h2>
        </div>

        <div className="mb-12">
          <div className="rounded-2xl overflow-hidden shadow-2xl w-[90%] m-auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193597.01650138895!2d-74.14431164802966!3d40.697024322354686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1750886040859!5m2!1sen!2sus" width="100%" height="400" style={{"border":"0px"}} loading="lazy" ></iframe>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                {area.icon}
                <h3 className="text-xl font-bold ml-3">{area.title}</h3>
              </div>
              <ul className="space-y-3">
                {area.locations.map((location, locationIndex) => (
                  <li key={locationIndex} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
