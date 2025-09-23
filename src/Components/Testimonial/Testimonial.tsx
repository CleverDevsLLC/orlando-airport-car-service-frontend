// eslint-disable-next-line react/no-unescaped-entities
"use client";
import { useRouter } from "next/navigation";

export default function TestimonialsSection() {
  const router = useRouter();

  const testimonials = [
    {
      quote:
        "AOutstanding professional service! The chauffeur arrived promptly for my Orlando airport pickup and the vehicle was immaculate. I've used Elite Times for my frequent business trips and they consistently exceed my expectations. Their attention to detail is unmatched – definitely my go-to for executive transportation.",
      author: "Michael Thompson",
      role: "Business Executive",
      image: "/images/user-1.webp",
    },
    {
      quote:
        "I've worked with transportation services Florida-wide, but none compare to their luxury sedan service. From airport transfers to special events, their chauffeurs arrive clean and dressed to impress, going the extra mile to ensure that each of my clients receives white-glove treatment. I wholeheartedly recommend it for weddings!",
      author: "Jennifer Williams",
      role: "Bride",
      image: "/images/user-2.webp",
    },
    {
      quote:
        "As the go-to ground transportation of our Orlando office, I can confidently say their limo service operates like a well-oiled machine. Whether our executives need luxury car service from the airport or corporate transportation for meetings, they deliver exceptional service from start to finish.",
      author: "David Rodriguez",
      role: "Family Vacation",
      image: "/images/user-3.webp",
    },
  ];

  const StarRating = () => (
    <div className="mb-3 flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-orange-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  );

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {
              "Don't just take our word for it. See what our valued clients have to say about their experience with our premium chauffeur services."
            }
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Profile Section */}
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-blue-200">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Star Rating */}
              <StarRating />

              {/* Testimonial Text */}
              <p className="italic leading-relaxed text-gray-700">
                &quot;{testimonial.quote}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            onClick={() => router.push("/reservation")}
          >
            Get Your Quote Today
          </button>
        </div>
      </div>
    </section>
  );
}
