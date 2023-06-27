'use client'

import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Link from 'next/link';

const BottomNav = ({ }) => {
  return (
    <div className="w-full flex items-center gap-5">
      <div className="flex items-center gap-3 cursor-pointer">
        <ViewCompactIcon className="w-8 h-10 text-white" />
        <span className="text-sm text-white font-semibold hidden md:block">Shop by categories</span>
      </div>
      <div className="w-[1px] h-5 bg-gray-600 hidden md:inline-block" />
      <ul className="m-0 p-0 flex items-center gap-3">
        <Link href="/" className="no-underline p-0 cursor-pointer">
          <li className="text-sm text-gray-300 uppercase hover:text-white cursor-pointer">Home</li>
        </Link>
        <Link href="/store" className="no-underline p-0 cursor-pointer">
          <li className="text-sm text-gray-300 uppercase hover:text-white cursor-pointer">Store</li>
        </Link>
        <Link href="/blogs" className="no-underline p-0 cursor-pointer">
          <li className="text-sm text-gray-300 uppercase hover:text-white cursor-pointer">Blogs</li>
        </Link>
        <Link href="/contact" className="no-underline p-0 cursor-pointer">
          <li className="text-sm text-gray-300 uppercase hover:text-white cursor-pointer">Contact</li>
        </Link>
      </ul>
    </div>
  )
}

export default BottomNav