import React from 'react'
import Navbar from '../Navbar/Navbar'
import Cta from '../CTA/Cta'
import FormSections from '@/Components/FormSections/FormSections'

export default function AtlAirportTransportation() {
  return (
    <div>
      <Navbar/>
      <FormSections 
        topSection="Choose between Meet and Greet or Curbside pickup! On-Time Guarantee ensures a seamless trip to or from the airport. Providing reliable airport transportation, hourly service, corporate travel, special events, and more." 
        bottomSection="Get to and from the airport on time without the hassle of long taxi lines!" 
        serviceType="One-Way Trip to the Airport" 
      />
      <Cta/>
    </div>
  )
}
