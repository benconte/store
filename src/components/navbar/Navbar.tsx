import { FC } from 'react'
import Banner from './Banner'
import NavOptions from './NavOptions'
import MobileNav from './MobileNav'
import BottomNav from './BottomNav'

const Navbar = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <div className='w-full min-h-full overflow-hidden'>
      <div className='w-full flex flex-col'>
        <div className='w-full h-auto bg-gray-900 px-3 md:px-12 pb-1'>
          <Banner />
          <MobileNav />
          <NavOptions />
        </div>
        <div className='px-3 md:px-12 w-full h-auto bg-darkBlue '>
          <BottomNav />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Navbar