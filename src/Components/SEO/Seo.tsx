import React from "react";
import { AlertTriangle, Check, Car, MapPin } from "lucide-react";

export default function Seo() {
  return (
    <div className="container mx-auto space-y-8 bg-gray-50 p-4">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          Orlando Airport Car Service & Premium Transportation
        </h1>
        <p className="text-xl text-gray-600">
          Your trusted partner for reliable Orlando Airport Car Service and
          luxury transportation
        </p>
      </header>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Things to Consider When Selecting Orlando Airport Car Service
        </h2>
        <p className="mb-4 text-gray-700">
          Orlando Airport Car Service options are in high demand, and there are
          indeed many companies to choose from. While you are searching for
          reliable MCO transportation, you must be asking yourself the question
          &quot;which Orlando Airport Car Service should I choose?&quot; The
          short answer is Orlando Airport Car Service - your trusted
          transportation partner. To help you make an informed decision, we
          would like to explain what to look for when selecting the right
          Orlando transportation company. Here are some common issues you may
          encounter:
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WarningItem text="Some Orlando car service companies advertise online without proper insurance or licensing. Always verify that your Orlando Airport Car Service provider is fully licensed and insured." />
          <WarningItem text="Some Orlando transportation companies overbook reservations and may subcontract your service to unknown third parties without your knowledge, compromising service quality and reliability for your MCO transportation needs." />
          <WarningItem text="Beware of Orlando car services advertising extremely low rates only to add hidden fees later. These may include gas surcharges, administration fees, or processing fees that weren't disclosed upfront, significantly increasing your final Orlando Airport Car Service cost." />
          <WarningItem text="Even if you avoid the above issues, unreliable Orlando Airport Car Service providers may send old, damaged, or poorly maintained vehicles, or arrive late, potentially causing you to miss your flight or important appointment." />
        </div>
        <p className="mt-4 font-semibold text-gray-700">
          Choose reliable Orlando Airport Car Service and avoid these common
          transportation issues!
        </p>
      </section>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Orlando Airport Car Service Promise
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <PromiseItem text="Integrity (We deliver exactly what we promise for your Orlando Airport Car Service)" />
          <PromiseItem text="Transparency (No hidden fees for Orlando Airport Car Service)" />
          <PromiseItem text="Reliability (Dependable Orlando Airport Car Service when you need us)" />
          <PromiseItem text="On-Time Service (Punctual Orlando Airport Car Service pickup & drop off)" />
          <PromiseItem text="Safety (Professional, background-checked chauffeurs for Orlando Airport Car Service)" />
          <PromiseItem text="Licensed & Insured (Fully licensed and insured Orlando Airport Car Service)" />
        </div>
      </section>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Fleet</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <VehicleItem text="Executive Sedans (Premium Orlando Airport Car Service vehicles from our own fleet)" />
          <VehicleItem text="Luxury Sedans (Mercedes Benz and similar for Orlando Airport Car Service)" />
          <VehicleItem text="Premium SUVs (Suburban, Escalade for Orlando Airport Car Service)" />
          <VehicleItem text="Stretch Limousines (Luxury Orlando transportation for special occasions)" />
          <VehicleItem text="SUV Stretch Limousines (Premium Orlando event transportation)" />
          <VehicleItem text="Party Bus (Group Orlando transportation and events)" />
          <VehicleItem text="Motor Coach (Large group Orlando Airport Car Service)" />
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Service Areas
        </h2>
        <div className="space-y-4">
          <ServiceAreaItem
            title="Primary Service Areas"
            areas="Our primary service area is the Orlando Florida region, MCO Airport, Disney World, Universal Studios, International Drive, Downtown Orlando, Winter Park, Kissimmee, Lake Buena Vista, Bay Lake, Celebration, Windermere, Dr. Phillips, and all surrounding Central Florida areas."
          />
          <ServiceAreaItem
            title="Primary Airports"
            areas="Our Orlando Airport Car Service primarily serves Orlando International Airport (MCO), Sanford Orlando International Airport (SFB), and other Central Florida airports. We provide reliable transportation to/from MCO for all terminals and offer extended service to Tampa International (TPA) and other regional airports when booked in advance."
          />
          <ServiceAreaItem
            title="Extended Service Areas"
            areas="Our Orlando Airport Car Service extends to longer distance destinations throughout Florida. Common destinations include Tampa, St. Petersburg, Clearwater, Daytona Beach, Jacksonville, Miami, Fort Lauderdale, and other major Florida cities. Whether you need transportation due to flight cancellations or urgent travel needs, we provide reliable service. Simply indicate your destination in our online reservation system for an all-inclusive quote. We provide point-to-point transportation from any hotel, airport, residential, or business address to your chosen destination."
          />
        </div>
      </section>

      <section className="mt-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Orlando Airport Car Service Coverage Area
        </h2>
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>Orlando</div>
          <div>MCO Airport</div>
          <div>Disney World</div>
          <div>Universal Studios</div>
          <div>International Drive</div>
          <div>Winter Park</div>
          <div>Kissimmee</div>
          <div>Lake Buena Vista</div>
          <div>Bay Lake</div>
          <div>Celebration</div>
          <div>Windermere</div>
          <div>Dr. Phillips</div>
          <div>Downtown Orlando</div>
          <div>Altamonte Springs</div>
          <div>Apopka</div>
          <div>Casselberry</div>
          <div>Clermont</div>
          <div>Davenport</div>
          <div>Deltona</div>
          <div>Deland</div>
          <div>Eustis</div>
          <div>Fernandina Beach</div>
          <div>Gainesville</div>
          <div>Haines City</div>
          <div>Lakeland</div>
          <div>Leesburg</div>
          <div>Longwood</div>
          <div>Maitland</div>
          <div>Mount Dora</div>
          <div>Ocala</div>
          <div>Ocoee</div>
          <div>Orange City</div>
          <div>Oviedo</div>
          <div>Sanford</div>
          <div>St. Augustine</div>
          <div>St. Cloud</div>
          <div>Tavares</div>
          <div>Titusville</div>
          <div>Winter Garden</div>
          <div>Winter Haven</div>
          <div>Winter Springs</div>
          <div>Zellwood</div>
          <div>Cocoa</div>
          <div>Cocoa Beach</div>
          <div>Melbourne</div>
          <div>Palm Bay</div>
          <div>Vero Beach</div>
          <div>Sebastian</div>
          <div>Port Orange</div>
          <div>New Smyrna Beach</div>
          <div>Daytona Beach</div>
          <div>Ormond Beach</div>
          <div>Jacksonville</div>
          <div>St. Johns</div>
          <div>Palatka</div>
          <div>Green Cove Springs</div>
          <div>Tampa</div>
          <div>St. Petersburg</div>
          <div>Clearwater</div>
          <div>Brandon</div>
          <div>Plant City</div>
          <div>Lakeland</div>
          <div>Bartow</div>
          <div>Sebring</div>
          <div>Avon Park</div>
          <div>Lake Wales</div>
          <div>Polk City</div>
          <div>Auburndale</div>
          <div>Winter Haven</div>
          <div>Sarasota</div>
          <div>Bradenton</div>
          <div>Venice</div>
          <div>Port Charlotte</div>
          <div>Punta Gorda</div>
          <div>Fort Myers</div>
          <div>Cape Coral</div>
          <div>Naples</div>
          <div>Bonita Springs</div>
          <div>Estero</div>
          <div>Marco Island</div>
          <div>Immokalee</div>
          <div>Lehigh Acres</div>
          <div>North Port</div>
          <div>Englewood</div>
          <div>Arcadia</div>
          <div>Wauchula</div>
          <div>Zolfo Springs</div>
          <div>Orlando Airport Car Service</div>
          <div>MCO Transportation</div>
          <div>Orlando Limo Service</div>
          <div>Airport Shuttle Orlando</div>
          <div>Executive Car Service Orlando</div>
        </div>
      </section>

      <footer className="mt-8 text-center text-gray-600">
        <p>Orlando Airport Car Service - Fully Licensed & Insured in Florida</p>
      </footer>
    </div>
  );
}

const WarningItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
    <AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
    <span className="text-sm text-yellow-800">{text}</span>
  </div>
);

const PromiseItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 rounded-md border border-green-200 bg-green-50 p-3">
    <Check className="h-6 w-6 flex-shrink-0 text-green-500" />
    <span className="text-sm text-green-800">{text}</span>
  </div>
);

const VehicleItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 rounded-md border border-blue-200 bg-blue-50 p-3">
    <Car className="h-6 w-6 flex-shrink-0 text-blue-500" />
    <span className="text-sm text-gray-800">{text}</span>
  </div>
);

const ServiceAreaItem = ({
  title,
  areas,
}: {
  title: string;
  areas: string;
}) => (
  <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
    <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
      <MapPin className="mr-2 h-5 w-5 text-blue-600" />
      {title}
    </h3>
    <p className="text-sm text-gray-700">{areas}</p>
  </div>
);
