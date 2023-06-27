'use client'

import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Map from './Map';

const Details = () => {
  return (
    <div className="basis-2/4 flex flex-col gap-3 py-5 px-4 sm:px-6 lg:px-8 bg-white">
        <h3 className="text-xl font-semibold text-gray-900">Get in touch with us</h3>
        <div className="text-sm text-gray-500 flex items-center flex-wrap gap-3">
            <HomeIcon className="w-5 h-5" />
            <p>Ms.390 st Island Random Location, 1111 United States</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center flex-wrap gap-3">
            <LocalPhoneIcon className="w-5 h-5" />
            <p>+12-3456-7890</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center flex-wrap gap-3">
            <EmailIcon className="w-5 h-5" />
            <p>Store@business.com</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center flex-wrap gap-3">
            <QueryBuilderIcon className="w-5 h-5" />
            <p>Monday - Friday 9AM - 8PM</p>
        </div>

        <Map />
    </div>
  )
}

export default Details