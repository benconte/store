import { OurBlog } from '@/utils/blog'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface IParams {
    blogId: number
}

const page = ({ params }: { params: IParams }) => {
    const blog = OurBlog[params.blogId - 1];
    return (
        <div className="w-full px-2 md:px-7 lg:px-12 py-5 md:py-8 flex flex-col md:flex-row items-start gap-5">
            <div className='flex flex-col justify-start gap-3 p-3 w-full md:max-w-xs bg-white shadow-md rounded-lg'>
                <h3 className='text-sm text-gray-900 font-semibold'>Shop By Categories</h3>
                <Link href={`/store?category=${encodeURIComponent("Computer & Laptop")}`} className="text-sm hover:underline text-gray-400">Computer & Laptop</Link>
                <Link href={`/store?category=${encodeURIComponent("Cameras & Videos")}`} className="text-sm hover:underline text-gray-400">Cameras & Videos</Link>
                <Link href={`/store?category=${encodeURIComponent("Smart Television")}`} className="text-sm hover:underline text-gray-400">Smart Television</Link>
                <Link href={`/store?category=${encodeURIComponent("Men's Clothing")}`} className="text-sm hover:underline text-gray-400">Men{`'`}s Clothing</Link>
                <Link href={`/store?category=${encodeURIComponent("Women's Clothing")}`} className="text-sm hover:underline text-gray-400">Women{`'`}s Clothing</Link>
            </div>
            <div className='w-full h-auto flex flex-col gap-3 rounded-lg overflow-hidden bg-white shadow-md'>
                <div className='w-full relative h-96'>
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='w-full flex flex-col gap-3 p-3'>
                    <h3 className='w-full text-sm font-semibold text-gray-900'>{blog.title}</h3>
                    <p className='text-sm text-gray-600'>{blog.context}</p>
                </div>
            </div>
        </div>
    )
}

export default page