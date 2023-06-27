'use client'

import Details from '@/components/contact/Details'
import Form from '@/components/contact/Form'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='w-full h-full px-2 md:px-7 lg:px-12 py-5 md:py-8'>
        {/* MAP */}
        <div className='w-full bg-white overflow-hidden shadow-md flex flex-col md:flex-row gap-5 basis-full md:basis-2/4 rounded-lg'>
            <Form />
            <Details />
        </div>
    </div>
  )
}

export default ContactPage