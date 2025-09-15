"use client";
import { Clock, Star, DollarSignIcon } from "lucide-react";

export default function WhyChooseLimo() {
  return (
    <section className="whychoose bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
          Why Choose Limo Service .com?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-6">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">On-Time Guarantee</h3>
            <p className="text-gray-600">
              Always on time, every time. We value your schedule.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-6">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Our Fleet</h3>
            <p className="text-gray-600">
              Top-of-the-line vehicles for a premium experience.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-6">
              <DollarSignIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Reasonable Rates</h3>
            <p className="text-gray-600">Best value for you money!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
