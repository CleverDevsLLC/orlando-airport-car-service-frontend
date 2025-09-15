import React, { Suspense } from 'react'
import Stripe from './Stripe'

export default function page() {
  return (
    <Suspense>
      <Stripe/>
    </Suspense>
  )
}
