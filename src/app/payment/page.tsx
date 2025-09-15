import React, { Suspense } from 'react'
import Billing from './Payment'

export default function page() {
  return (
    <Suspense>
      <Billing/>
    </Suspense>
  )
}
