'use client'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
    const [email, setEmail] = useState("");

    const sendEmail = () => {
        setTimeout(() => {
            setEmail("");
            toast.success("Subscription successful. You will receive emails", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }, 3000)
    }
    return (
        <div className='z-0 w-full bg-darkBlue py-10 px-3 md:px-20 overflow-hidden'>
            <div className="w-full h-auto flex flex-col md:flex-row md:items-center justify-around pb-5 border-b border-gray-600 gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                    <EmailIcon className="w-4 h-4 md:w-7 md:h-7 text-white" />
                    <h3 className='text-base md:text-2xl text-white font-semibold'>Sign up for Newsletter</h3>
                </div>
                <div className="flex items-center bg-white rounded-lg p-1">
                    <input
                        type="email"
                        placeholder='your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full md:max-w-xl outline-none border-none px-2 sm:px-2 text-gray-900 text-xs sm:text-sm font-semibold"
                    />
                    <button type="button" className="text-sm bg-darkBlue px-1 py-1 sm:py-2 text-white uppercase rounded-lg" onClick={sendEmail}>
                        Subscribe
                    </button>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-8 py-5 md:py-10 border-b border-gray-600'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-base font-semibold text-white'>
                        Contact Us
                    </h3>
                    <ul className='flex flex-col gap-3 justify-center text-white'>
                        <li className='text-xs sm:text-sm'>Our Store</li>
                        <li className='text-xs sm:text-sm'>Ms.390 st Island Random Location, 1111 United States</li>
                        <li className='text-xs sm:text-sm'>+12-3456-7890</li>
                        <li className='text-xs sm:text-sm'>Store@business.com</li>
                        <li className='flex items-center flex-wrap gap-2'>
                            <Link href="https://instagram.com" className='no-underline'>
                                <p className='m-0 rounded-full cursor-pointer bg-gray-600 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500'>
                                    <InstagramIcon className='w-3 sm:w-5 h-3 sm:h-5 m-2' />
                                </p>
                            </Link>
                            <Link href="https://facebook.com" className='no-underline'>
                                <p className='m-0 rounded-full cursor-pointer bg-gray-600 hover:bg-blue-500'>
                                    <FacebookIcon className='w-3 sm:w-5 h-3 sm:h-5 m-2' />
                                </p>
                            </Link>
                            <Link href="https://pinterest.com" className='no-underline'>
                                <p className='m-0 rounded-full cursor-pointer bg-gray-600 hover:bg-red-500'>
                                    <PinterestIcon className='w-3 sm:w-5 h-3 sm:h-5 m-2' />
                                </p>
                            </Link>
                            <Link href="https://twitter.com" className='no-underline'>
                                <p className='m-0 rounded-full cursor-pointer bg-gray-600 hover:bg-blue-400'>
                                    <TwitterIcon className='w-3 sm:w-5 h-3 sm:h-5 m-2' />
                                </p>
                            </Link>
                            <Link href="https://youtube.com" className='no-underline'>
                                <p className='m-0 rounded-full cursor-pointer bg-gray-600 hover:bg-rose-600'>
                                    <YouTubeIcon className='w-3 sm:w-5 h-3 sm:h-5 m-2' />
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='text-base font-semibold text-white'>
                        Information
                    </h3>
                    <ul className='flex flex-col gap-3 justify-center text-white'>
                        <Link href="#" className='hover:underline'>
                            <li className='text-xs sm:text-sm'>Privacy Policy</li>
                        </Link>
                        <Link href="#" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Refund Policy</li>
                        </Link>
                        <Link href="#" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Shipping Policy</li>
                        </Link>
                        <Link href="#" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Terms of Service</li>
                        </Link>
                        <Link href="#" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>faq</li>
                        </Link>
                    </ul>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='text-base font-semibold text-white'>
                        Account
                    </h3>
                    <ul className='flex flex-col gap-3 justify-center text-white'>
                        <Link href="/" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Home</li>
                        </Link>
                        <Link href="/profile" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Profile</li>
                        </Link>
                        <Link href="/store" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Store</li>
                        </Link>
                        <Link href="/blogs" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Blogs</li>
                        </Link>
                        <Link href="/contact" className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Contact</li>
                        </Link>
                    </ul>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='text-base font-semibold text-white'>
                        Quick Links
                    </h3>
                    <ul className='flex flex-col gap-3 justify-center text-white'>
                        <Link href={`/store?category=${encodeURIComponent('Computer & Laptop')}`} className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Computer & Laptop</li>
                        </Link>
                        <Link href={`/store?category=${encodeURIComponent('Cameras & Videos')}`} className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Cameras & Videos</li>
                        </Link>
                        <Link href={`/store?category=${encodeURIComponent('Smart Watches')}`} className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Smart Watches</li>
                        </Link>
                        <Link href={`/store?category=${encodeURIComponent("Men's Clothing")}`} className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Men{`'`}s Clothing</li>
                        </Link>
                        <Link href={`/store?category=${encodeURIComponent("Women's Clothing")}`} className='hover:underline'>
                            <li className='text-xs sm:text-sm '>Women{`'`}s Clothing</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className='w-full flex items-center justify-between flex-wrap gap-5 py-8'>
                <p className='text-xs sm:text-sm font-semibold text-white'>@2023 All rights reserved</p>
                <small className="text-xs sm:text-sm font-semibold text-darkYellow">This Website is for showcases ONLY!</small>
            </div>
        </div>
    )
}

export default Footer