import { Building2, BookOpen, Globe } from "lucide-react";

export default function PlacesWeServeSection() {
  const serviceAreas = [
    {
      title: "Cities & Towns",
      icon: <Building2 className="h-6 w-6 text-gray-700" />,
      locations: [
        "Orlando, FL",
        "Lake Buena Vista, FL",
        "Dr. Phillips, FL",
        "Winter Park, FL",
        "Kissimmee, FL",
        "Celebration, FL",
        "Bay Hill, FL",
      ],
    },
    {
      title: "Counties & Regions",
      icon: <BookOpen className="h-6 w-6 text-gray-700" />,
      locations: [
        "Orange County",
        "Osceola County",
        "Seminole County",
        "Lake County",
      ],
    },
    {
      title: "General Region",
      icon: <Globe className="h-6 w-6 text-gray-700" />,
      locations: [
        "Central Florida",
        "Greater Orlando Area",
        "The Villages",
        "Disney World Resort Area",
      ],
    },
  ];

  return (
    <section className="bg-blue-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-4 font-medium text-blue-300">Our values</p>
          <h2 className="mb-12 text-4xl font-bold">Places We Serve</h2>
        </div>

        <div className="mb-12">
          <div className="m-auto w-[90%] overflow-hidden rounded-2xl shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224070.0067877835!2d-81.52676764843176!3d28.48108377703785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773ccf6097d65%3A0x90ea3b67e734c4e4!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1695476889000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: "0px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 text-gray-800 shadow-lg"
            >
              <div className="mb-6 flex items-center">
                {area.icon}
                <h3 className="ml-3 text-xl font-bold">{area.title}</h3>
              </div>
              <ul className="space-y-3">
                {area.locations.map((location, locationIndex) => (
                  <li
                    key={locationIndex}
                    className="flex items-center text-gray-600"
                  >
                    <span className="mr-3 h-2 w-2 rounded-full bg-gray-400"></span>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
