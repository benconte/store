import { useCategories } from '@/hooks/useCategories'
import { useCategoryServices } from '@/hooks/useCategoryServices'
import Image from 'next/image'
import React from 'react'

const Categories = () => {
    const services = useCategoryServices()
    const categories = useCategories()

    return (
        <div className='w-full py-6'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap gap-5 my-10'>
                {services.map((service) => (
                    <div key={service.title} className='flex items-center gap-5'>
                        <Image
                            src={service.image}
                            alt={service.title}
                            width={25}
                            height={25}
                            className="object-cover"
                        />
                        <div className='flex flex-col'>
                            <h3 className='text-sm text-gray-900 font-semibold'>{service.title}</h3>
                            <span className='text-sm text-gray-600'>{service.subtitle}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 py-8 bg-white rounded-lg shadow-md mb-6">
                {categories.map((cat) => (
                    <div key={cat.label} className='flex items-center gap-5 mt-5 cursor-pinter'>
                        <div className='flex flex-col flex-grow cursor-pointer'>
                            <h5 className='text-sm text-gray-900 font-semibold leading-6'>{cat.label}</h5>
                            <span className='text-xs md:text-sm text-gray-600'>{cat.stock} items</span>
                        </div>
                        <div className='relative max-w-sm shrink-0 cursor-pointer'>
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories