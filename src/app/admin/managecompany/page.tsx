import React, { Suspense } from 'react'
import ManageCompany from './Company/Company'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ManageCompany/>
      </Suspense>
    </div>
  )
}
