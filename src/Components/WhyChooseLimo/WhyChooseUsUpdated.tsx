import { Clock, Car, DollarSign } from "lucide-react";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Clock,
      title: "On-Time Guarantee",
      description:
        "Punctual Service, Every Time We understand time is gold, so we ensure your chauffeur arrives on schedule.",
    },
    {
      icon: Car,
      title: "Our Fleet",
      description:
        "Top-of-the-line vehicles for a prestigious transportation experience.",
    },
    {
      icon: DollarSign,
      title: "Reasonable Rates",
      description:
        "Competitive rates for your luxury ground transportation needs.",
    },
  ];

  return (
    <section className="bg-[#EBF0FF] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 font-medium text-blue-600">Our values</p>
          <h2 className="mb-8 text-4xl font-bold">Why Choose Us?</h2>
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-600">
            We go that extra mile to deliver a premium travel experience. With a
            focus on safety, reliability, and customer satisfaction, we deliver
            world-class service with complete trust. From your preferred
            departure times, family gatherings, and corporate meetings that make
            your business formalities quick and efficient.{" "}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-300">
                <feature.icon className="h-8 w-8 stroke-2 text-gray-700" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
