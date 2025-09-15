import { Clock, Car, DollarSign } from "lucide-react"

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Clock,
      title: "On-Time Guarantee",
      description: "Always on time, every time. We value your schedule.",
    },
    {
      icon: Car,
      title: "Our Fleet",
      description: "Top-of-the-line vehicles for a premium experience.",
    },
    {
      icon: DollarSign,
      title: "Reasonable Rates",
      description: "Best value for your money!",
    },
  ]

  return (
    <section className="py-16 bg-[#EBF0FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">Our values</p>
          <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            We go the extra mile to deliver a premium travel experience. With a focus on safety, reliability, and
            customer satisfaction, we ensure every ride is smooth and stress-free. Enjoy professional drivers, timely
            pickups, and personalized service that puts your comfort first—because you deserve the best.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-gray-700 stroke-2" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
