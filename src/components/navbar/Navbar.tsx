import { FC } from 'react'
import Banner from './Banner'
import NavOptions from './NavOptions'
import MobileNav from './MobileNav'
import BottomNav from './BottomNav'
import { getCategories } from '@/actions'

const Navbar = async (
  { children }: { children: React.ReactNode }
) => {
  const categories = await getCategories();
  return (
    <div className='w-full min-h-full overflow-hidden'>
      <div className='w-full flex flex-col'>
        <div className='w-full h-auto bg-gray-900 px-3 md:px-12 pb-1'>
          <Banner />
          <MobileNav />
          <NavOptions />
        </div>
        <div className='px-3 md:px-12 w-full h-auto bg-darkBlue '>
          <BottomNav categories={categories} />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Navbar