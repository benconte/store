'use client'

import { Categories } from '@prisma/client'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface CategoriesProps {
    categories: Categories[]
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get("category");
    const router = useRouter()
    const handleFilter = (category: string) => {
        router.push(`/store?category=${encodeURIComponent(category)}`)
    }
    return (
        <div className='w-full h-auto rounded-lg shadow-lg bg-white p-2 flex items-center gap-4 overflow-x-auto'>
            {categories.map((category) => (
                <h3 key={category.id} className={clsx(
                    'flex-shrink-0 flex-grow-0 text-center cursor-pointer p-3 rounded-lg text-sm font-semibold text-gray-900',
                    categoryParam && categoryParam === category.name ? "bg-darkYellow" : "bg-white"
                )} onClick={() => handleFilter(category.name)}>
                    {category.name}
                </h3>
            ))}
        </div>
    )
}

export default Categories