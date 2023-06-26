import { OurBlog } from '@/utils/blog'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = () => {
  const blogs = OurBlog;
  return (
    <div className="w-full px-2 md:px-7 lg:px-12 py-5 md:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {blogs.map((blog, index) => (
        <Link href={`/blogs/${index+1}`} key={index} className='no-underline cursor-pointer w-full h-auto flex flex-col gap-3 rounded-lg bg-white overflow-hidden shadow-md'>
          <div className='w-full relative h-52'>
            <Image 
              src={blog.image}
              alt={blog.title}
              fill
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full flex flex-col gap-3 p-3'>
            <h3 className='w-full text-sm font-semibold text-gray-900 truncate'>{blog.title}</h3>
            <div className='text-sm text-gray-600 line-clamp-3'>{blog.context}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default page