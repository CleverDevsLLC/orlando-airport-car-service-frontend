import React from 'react'
import Navbar from '@/Components/Common/Navbar/Navbar'
import ReservationForm from '@/Components/Reservations/Reservations'
import { Info } from 'lucide-react'

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-5">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Reserve Your Ride</h1>
        </section>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Dynamic Pricing Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our rates change dynamically based on the current supply/demand in the ground transportation industry as well as other variables such as gas prices that largely influence our current rates. In order to receive our lowest and most accurately quoted rate, please take a moment and fill out our quote request form below, and we will provide you with our lowest possible rates and the most reliable service!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request a Quote</h2>
            <ReservationForm />
          </div>
        </div>
      </main>

      <div className='p-[20px] text-gray-600'>
        <p>Our Gratuity Policy: While there is no manditory gratuity required for most reservations, a minimum 20% Gratuity is the industry standard so please consider tipping your driver at least 20% or more for good service.</p>
        <p>Lax car service to palm springs california, affordable limo service to lax.</p>
      </div>
    </div>
  )
}

