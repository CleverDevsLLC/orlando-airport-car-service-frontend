"use client";

import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
        Call <a href="tel: 4044686938">(404) 459-5749</a> or
        </h2>
        <p className="mb-8 text-xl text-gray-600">
        Save 10% if you
        </p>
        <Link
          href="/reservation"
          className="rounded-lg bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600"
        >
          Book Online Now
        </Link>
      </div>
    </section>
  );
}
