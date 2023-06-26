import { OurBlog } from '@/utils/blog'
import Image from 'next/image';
import React from 'react'

interface IParams {
    blogId: number
}

const page = ({ params }: { params: IParams }) => {
    const blog = OurBlog[params.blogId - 1];
    return (
        <div className="w-full px-2 md:px-7 lg:px-12 py-5 md:py-8 bg-white shadow-md">
                <div className='w-full h-auto flex flex-col gap-3 rounded-lg overflow-hidden'>
                    <div className='w-full relative h-72'>
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className='w-full h-full object-contain'
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