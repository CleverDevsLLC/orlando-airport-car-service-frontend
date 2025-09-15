"use client";
import Image from "next/image";

export default function Fleet() {
  return (
    <div>
      <section className="bg-white py-10 sm:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:mb-10 sm:text-3xl">
          Discover Our Elite Vehicles
          </h2>
          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl sm:h-[500px] md:h-96">
            <Image
              src="/images/fleet-bg.jpg"
              alt="Limo Fleet"
              className="h-full w-full object-cover"
              width={1600}
              height={800}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 sm:p-6">
              <p className="mb-4 text-center text-xl font-bold text-white sm:mb-6 sm:text-2xl">
                Limo Service
              </p>
              <p className="font-regular scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-4 max-h-[200px] w-full overflow-y-auto text-center text-sm text-white sm:mb-6 sm:max-h-[250px] sm:w-[90%] sm:text-base md:max-h-none md:w-[80%]">
                Enjoy premium ground transportation with our top-tier limo
                service. Our fleet includes sleek sedans, spacious SUVs, town
                cars, and stretch limousines, perfect for any occasion. Whether
                you need airport transfers, corporate travel, or a stylish ride
                for a special event, we’ve got you covered. We proudly serve
                multiple locations, including Marietta, Alpharetta, Sandy
                Springs, Augusta, Kennesaw, and Athens. Need a long-distance
                trip? We also travel to destinations like Savannah and
                Charlotte. Book online today and take advantage of exclusive
                savings on your next luxury ride!{" "}
              </p>
              {/* <button
                className="rounded-lg bg-gray-800 px-4 py-2 text-base font-bold text-white transition-opacity hover:bg-gray-600 sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => router.push("/about")}
              >
                Read More
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
