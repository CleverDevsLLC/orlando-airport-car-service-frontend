"use client"
import { useRouter } from "next/navigation"

export default function TestimonialsSection() {
  const router = useRouter()

  const testimonials = [
    {
      quote:
        "Absolutely outstanding service! The chauffeur was punctual, professional, and the vehicle was immaculate. I've used Limos of Your Service for multiple business trips and they consistently exceed my expectations. Their attention to detail makes all the difference when I need to focus on preparing for meetings.",
      author: "Michael Thompson",
      role: "Business Executive",
      image: "/images/user-1.webp",
    },
    {
      quote:
        "Our wedding day transportation was flawless! The stretch limousine was gorgeous and our chauffeur went above and beyond to make our special day perfect. He even laid out a red carpet for us! The entire experience from booking to the actual day was stress-free and elegant. Highly recommend for any wedding!",
      author: "Jennifer Williams",
      role: "Bride",
      image: "/images/user-2.webp",
    },
    {
      quote:
        "We booked a private tour of Los Angeles and it was the highlight of our family vacation. Our chauffeur was knowledgeable about the city and customized the tour to our interests. The luxury SUV was comfortable for our family of five and the kids loved feeling like VIPs. Will definitely use again for our next trip!",
      author: "David Rodriguez",
      role: "Family Vacation",
      image: "/images/user-3.webp",
    },
  
  ]

  const StarRating = () => (
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {
              "Don't just take our word for it. See what our valued clients have to say about their experience with our premium chauffeur services."
            }
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Profile Section */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Star Rating */}
              <StarRating />

              {/* Testimonial Text */}
              <p className="text-gray-700 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
            onClick={() => router.push("/reservation")}
          >
            Get Your Quote Today
          </button>
        </div>
      </div>
    </section>
  )
}
