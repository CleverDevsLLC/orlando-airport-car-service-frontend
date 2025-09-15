import React from "react";
import { AlertTriangle, Check, Car, MapPin } from "lucide-react";

export default function Seo() {
  return (
    <div className="container mx-auto space-y-8 bg-gray-50 p-4">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          Affordable Town Car Company & Limousine Service
        </h1>
        <p className="text-xl text-gray-600">
          Your trusted partner for reliable and transparent limo services
        </p>
      </header>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Things to Consider When Selecting a Limo Service
        </h2>
        <p className="mb-4 text-gray-700">
          Affordable lax car services, and affordable lax limo services are in
          high demand, and there are indeed many options to chose from. While
          you are hunting for a nyc airport car service you must be asking
          yourself the question &quot;which one should I choose?&quot;; the
          short answer is Affordable Town Car Company & Limousine Service. In
          order to further elaborate, we would like to explain a little more
          about what our industry is like and what you might expect while
          hunting for the right transportation company. Here are some frequently
          occuring misfortunes that you may run into without knowing:
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <WarningItem text="It is not uncommon for lax or los angeles limo companies who advertise on the internet to be bandit car service companies who run their limo businesses without any proper insurance or license." />
          <WarningItem text="Many other limo companies accept a large quantity of limo reservations even though they are unable to service them, when this happens, they pick the highest paying customers and either flake out on the lower paying customers or if they have at least a little integrity they hand you off to another company without your knowledge, pay them a lower rate than you paid, and after that they won't have the slightest idea how your service will turn out; either way your service quality will suffer immensely." />
          <WarningItem text="Some of the cheap limo companies in Los Angeles will advertise a very low rate, this will excite you, and thus you will confirm a booking with them; seems great right? Unfortunately, often times once the passenger enters the vehicle, the driver will charge the passenger for a higher amount of money than was previously quoted. This is similar to the underhanded tactics we all know as 'bait and switch'. Hidden fees have a multitude of names like 'Gas Surcharge', 'PUC Fee', 'Administration Fee', 'Processing Fee', among other various names they may carry. Other times, they will just add the fees and charge your card without your knowledge at all, and the only way you would know is to check your credit card statement." />
          <WarningItem text="Let's say you got lucky, and none of the above occured, you still will run the greatly increased chance that you will get a very old, ungly, damaged, and dirty stretch limo or town car service, and even worse, your ride could be extreamly late and cause you to miss your flight or other important occasion." />
        </div>
        <p className="mt-4 font-semibold text-gray-700">
          Avoid the headaches above, and travel with Steven Baird Master
          Chauffeur!
        </p>
      </section>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Steven Baird&apos;s Promise
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <PromiseItem text="Integrity (We will always deliver what we promise)" />
          <PromiseItem text="Transparency (There will never be hidden fees)" />
          <PromiseItem text="Reliability (We will be there when you need us)" />
          <PromiseItem text="On-Time Pick Up & Drop Off (We will always be ontime)" />
          <PromiseItem text="Safety (Our drivers are pre-screened and go through background checks)" />
          <PromiseItem text="License & Insurance (Our fleet is fully insured, and our company is licensed)" />
        </div>
      </section>

      <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Fleet</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <VehicleItem text="Executive Lincoln Town Cars (we only provide towncars from our own fleet, other vehicles come from licensed companies who receive a lead from this website and place a bid on your request, and we do not take any legal responsibility for them)" />
          <VehicleItem text="Mercedes Benz Sedan" />
          <VehicleItem text="SUV (Suburban / Escalade)" />
          <VehicleItem text="Stretch Limousines" />
          <VehicleItem text="SUV Stretch Limousines (Hummers, Excursions, Escalade)" />
          <VehicleItem text="Party Bus" />
          <VehicleItem text="Motor Coach" />
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Service Areas
        </h2>
        <div className="space-y-4">
          <ServiceAreaItem
            title="Primary Service Areas"
            areas="Our primary service area is the Los Angeles California area, LAX Airport, Hollywood, Beverly Hills, Santa Monica, Manhattan Beach, Down Town LA, Culver City, Marina Del Rey, Hermosa Beach, Redondo Beach, Burbank, Encino, Glendale, Pasadena, North Hollywood, Sherman Oaks, Woodland Hills, Hidden Hills, Lost Hills, and all surrounding areas."
          />
          <ServiceAreaItem
            title="Primary Airports"
            areas="The primary airports around these cities include: Los Angeles International Airport (LAX), Bob Hope Airport in Burbank Ca (BUR), Long Beach Airport (LGB), John Wayne / Santa Ana Airport (SNA), Palm Springs (PSP), and San Diego International (SAN). Longer distance airport pickup & Drop-off service like taking a Car service from SFO, and car service to SFO are also possible when booked in advance."
          />
          <ServiceAreaItem
            title="Long Distance Destinations"
            areas="It is frequently needed for passengers to be driven on long distance trips, either because of a flight cancellation or due to short notice coupled with an intense urgency to get there. Some common places we have driven our passengers to include: Palm Springs California, Santa Barbara, San Diego, San Francisco, Bakersfield, and many more out of town destinations. If you fill out the request for quote, we will gladly reply with a very low rate that will be realistic in nature and all inclusive of fees. For example, if you want to book a limo service from Palm Springs to LAX, or a car service from San Diego to Lax, you would simply need to indicate that in our online 24/7 limo reservation software located on the reservation page. Note: we do not offer any tour / tours service, we simply pick you up at any hotel / airport / residential or business address and drop you off at a place of your choosing."
          />
        </div>
      </section>

      <section className="mt-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Our Entire Service Area
        </h2>
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>Acampo</div>
          <div>Fairfield</div>
          <div>Newport Beach</div>
          <div>Santa Maria</div>
          <div>Alhambra</div>
          <div>Felton</div>
          <div>Nipomo</div>
          <div>Santa Monica</div>
          <div>Aliso Viejo</div>
          <div>Fontana</div>
          <div>North Highlands</div>
          <div>Santa Paula</div>
          <div>Alta Loma</div>
          <div>Forestville</div>
          <div>North Hills</div>
          <div>Santa Rosa</div>
          <div>Altadena</div>
          <div>Foster City</div>
          <div>North Hollywood</div>
          <div>Santa Barbara</div>
          <div>Anaheim</div>
          <div>Fountain Valley</div>
          <div>Northridge</div>
          <div>Seaside</div>
          <div>Antioch</div>
          <div>Fremont</div>
          <div>Norwalk</div>
          <div>Sebastopol</div>
          <div>Apple Valley</div>
          <div>Fresno</div>
          <div>Novato</div>
          <div>Sherman Oaks</div>
          <div>Arcadia</div>
          <div>Fullerton</div>
          <div>Oak Park</div>
          <div>Shingle Springs</div>
          <div>Arleta</div>
          <div>Garden Grove</div>
          <div>Oakdale</div>
          <div>Simi Valley</div>
          <div>Arroyo Grande</div>
          <div>Gardena</div>
          <div>Oakland</div>
          <div>Solvang</div>
          <div>Auburn</div>
          <div>Gilroy</div>
          <div>Ontario</div>
          <div>Sonoma</div>
          <div>Bakersfield</div>
          <div>Glendale</div>
          <div>Orange</div>
          <div>Soquel</div>
          <div>Baldwin Park</div>
          <div>Goleta</div>
          <div>Oroville</div>
          <div>South Lake Tahoe</div>
          <div>Banning</div>
          <div>Granada Hills</div>
          <div>Oxnard</div>
          <div>Stockton</div>
          <div>Bella Vista</div>
          <div>Granite Bay</div>
          <div>Pacific Plsds</div>
          <div>Studio City</div>
          <div>Bellflower</div>
          <div>Greenbrae</div>
          <div>Pacifica</div>
          <div>Suisun City</div>
          <div>Belmont</div>
          <div>Hacienda Heights</div>
          <div>Palm Desert</div>
          <div>Sun Valley</div>
          <div>Benicia</div>
          <div>Hanford</div>
          <div>Palm Springs</div>
          <div>Sunnyvale</div>
          <div>Berkeley</div>
          <div>Harbor City</div>
          <div>Palo Alto</div>
          <div>Sunset Beach</div>
          <div>Beverly Hills</div>
          <div>Hawaiian Gardens</div>
          <div>Palos Vrds Pnsla</div>
          <div>Sutter Creek</div>
          <div>Bradbury</div>
          <div>Hawthorne</div>
          <div>Panorama City</div>
          <div>Sylmar</div>
          <div>Brea</div>
          <div>Hayward</div>
          <div>Paso Robles</div>
          <div>Tahoe City</div>
          <div>Burbank</div>
          <div>Hemet</div>
          <div>Pebble Beach</div>
          <div>Tarzana</div>
          <div>Burlingame</div>
          <div>Hesperia</div>
          <div>Penn Valley</div>
          <div>Temecula</div>
          <div>Byron</div>
          <div>Highland</div>
          <div>Petaluma</div>
          <div>Thousand Oaks</div>
          <div>Calabasas</div>
          <div>Hollister</div>
          <div>Pico Rivera</div>
          <div>Torrance</div>
          <div>Camarillo</div>
          <div>Huntington Beach</div>
          <div>Pine Grove</div>
          <div>Truckee</div>
          <div>Campbell</div>
          <div>Inglewood</div>
          <div>Pismo Beach</div>
          <div>Tulare</div>
          <div>Canoga Park</div>
          <div>Inyokern</div>
          <div>Placentia</div>
          <div>Tustin</div>
          <div>Capitola</div>
          <div>Irvine</div>
          <div>Placerville</div>
          <div>Union City</div>
          <div>Carlsbad</div>
          <div>La Habra</div>
          <div>Pleasant Hill</div>
          <div>Upland</div>
          <div>Carmel</div>
          <div>La Jolla</div>
          <div>Pleasanton</div>
          <div>Vacaville</div>
          <div>Carpinteria</div>
          <div>La Mesa</div>
          <div>Quartz Hill</div>
          <div>Vallejo</div>
          <div>Carson</div>
          <div>La Mirada</div>
          <div>Quincy</div>
          <div>Van Nuys</div>
          <div>Castro Valley</div>
          <div>La Puente</div>
          <div>Rancho Cordova</div>
          <div>Venice</div>
          <div>Cathedral City</div>
          <div>La Quinta</div>
          <div>Rancho Cucamonga</div>
          <div>Ventura</div>
          <div>Ceres</div>
          <div>La Verne</div>
          <div>Rancho Mirage</div>
          <div>Victorville</div>
          <div>Cerritos</div>
          <div>Laguna Beach</div>
          <div>Rancho Pls Vrds</div>
          <div>Visalia</div>
          <div>Chico</div>
          <div>Laguna Hills</div>
          <div>Rancho Santa Fe</div>
          <div>Vista</div>
          <div>Chula Vista</div>
          <div>Laguna Niguel</div>
          <div>Red Bluff</div>
          <div>Walnut</div>
          <div>Citrus Heights</div>
          <div>Lake Forest</div>
          <div>Redding</div>
          <div>Lake Forest</div>
          <div>Redding</div>
          <div>Redlands</div>
          <div>Redondo Beach</div>
          <div>Redwood City</div>
          <div>Richmond</div>
          <div>Rio Linda</div>
          <div>Riverside</div>
          <div>Rohnert Park</div>
          <div>Rolling Hills</div>
          <div>Rolling Hls Ests</div>
          <div>Roseville</div>
          <div>Rough And Ready</div>
          <div>S San Francisco</div>
          <div>Sacramento</div>
          <div>Salinas</div>
          <div>San Bernardino</div>
          <div>San Bruno</div>
          <div>San Carlos</div>
          <div>San Clemente</div>
          <div>San Diego</div>
          <div>San Dimas</div>
          <div>San Francisco</div>
          <div>San Jn Bautista</div>
          <div>San Jose</div>
          <div>San Leandro</div>
          <div>San Luis Obispo</div>
          <div>San Mateo</div>
          <div>San Pedro</div>
          <div>San Rafael</div>
          <div>San Ramon</div>
          <div>Santa Ana</div>
          <div>Santa Barbara</div>
          <div>Santa Clara</div>
          <div>Santa Clarita</div>
          <div>Santa Cruz</div>
          <div>Santa Fe Springs</div>
          <div>Santa Maria</div>
          <div>Santa Monica</div>
          <div>Santa Paula</div>
          <div>Santa Rosa</div>
          <div>Santa Barbara</div>
          <div>Seaside</div>
          <div>Sebastopol</div>
          <div>Sherman Oaks</div>
          <div>Shingle Springs</div>
          <div>Simi Valley</div>
          <div>Solvang</div>
          <div>Sonoma</div>
          <div>Soquel</div>
          <div>South Lake Tahoe</div>
          <div>Stockton</div>
          <div>Studio City</div>
          <div>Suisun City</div>
          <div>Sun Valley</div>
          <div>Sunnyvale</div>
          <div>Sunset Beach</div>
          <div>Sutter Creek</div>
          <div>Sylmar</div>
          <div>Tahoe City</div>

          <div>Tarzana</div>
          <div>Temecula</div>
          <div>Thousand Oaks</div>
          <div>Torrance</div>
          <div>Truckee</div>
          <div>Tulare</div>
          <div>Tustin</div>
          <div>Union City</div>
          <div>Upland</div>
          <div>Vacaville</div>
          <div>Vallejo</div>
          <div>Van Nuys</div>
          <div>Venice</div>
          <div>Ventura</div>
          <div>Victorville</div>
          <div>Visalia</div>
          <div>Vista</div>
          <div>Walnut</div>
          <div>Walnut Creek</div>
          <div>Watsonville</div>
          <div>Weldon</div>
          <div>West Covina</div>
          <div>West Hills</div>
          <div>West Hollywood</div>
          <div>West Sacramento</div>
          <div>Westminster</div>
          <div>Whittier</div>
          <div>Windsor</div>
          <div>Woodland Hills</div>
          <div>Yorba Linda</div>
          <div>Yuba City</div>
          <div>Yucaipa</div>
          <div> LGA Airport Car Service</div>
          <div> PHL Airport Car Service</div>
          <div> 	Airport Limo Denver</div>
          <div> 	 Charter Bus</div>
          <div>	Airport Transportation Alpharetta</div>
          
        </div>
      </section>

      <footer className="mt-8 text-center text-gray-600">
        <p>We&apos;re Fully Licensed & Insured: California Puc#25377-P</p>
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
