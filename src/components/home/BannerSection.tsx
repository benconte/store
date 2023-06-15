'use client'

import React, { FC } from 'react'
import { useBanner } from '@/hooks/useBanner'
import clsx from 'clsx';
import ImgSlider from './ImgSlider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const BannerSection = () => {
    const { bigBanner, smallBanner } = useBanner();

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplaySpeed: 5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
    };

    return (
        <div className='w-full flex flex-col lg:flex-row gap-5'>
            <ImgSlider />

            <div className='w-full h-64 md:h-96 grid grid-cols-2 gap-3'>
                <div className={`w-full h-full rounded-lg relative overflow-hidden`}>
                    <Image
                        src={"/images/catbanner-01.jpg"}
                        alt=""
                        fill
                        className='object-cover'
                    />
                    <div className='absolute top-0 right-0 left-0 pt-1 md:pt-5 pb-14 px-2 md:px-5'>
                        <small className='text-sm text-[#D0A291] font-semibold pb-1 md:pb-3'>
                            Best Sale
                        </small>
                        <h2 className='font-semibold text-base md:text-2xl text-gray-900 pb-1 md:pb-3'>
                            laptops Max
                        </h2>
                        <p className='text-xs text-gray-900 w-3/6 line-clamp-3 md:line-clamp-none'>
                            From $1699.00 or 64.62/mo.
                        </p>
                    </div>
                </div>
                <div className={`w-full h-full rounded-lg relative overflow-hidden`}>
                    <Image
                        src={"/images/catbanner-03.jpg"}
                        alt=""
                        fill
                        className='object-cover'
                    />
                    <div className='absolute top-0 right-0 left-0 pt-1 md:pt-5 pb-14 px-2 md:px-5'>
                        <small className='text-sm text-[#D0A291] font-semibold pb-1 md:pb-3'>
                            New Arrival
                        </small>
                        <h2 className='font-semibold text-base md:text-2xl text-gray-900 pb-1 md:pb-3'>
                            Buy IPad Air
                        </h2>
                        <p className='text-xs text-gray-900 w-3/6 line-clamp-3 md:line-clamp-none'>
                            From $899.00 or $49.62/mo.
                        </p>
                    </div>
                </div>
                <div className={`w-full h-full rounded-lg relative overflow-hidden`}>
                    <Image
                        src={"/images/catbanner-02.jpg"}
                        alt=""
                        fill
                        className='object-cover'
                    />
                    <div className='absolute top-0 right-0 left-0 pt-1 md:pt-5 pb-14 px-2 md:px-5'>
                        <small className='text-sm text-[#D0A291] font-semibold pb-1 md:pb-3'>
                            15% OFF
                        </small>
                        <h2 className='font-semibold text-base md:text-2xl text-gray-900 pb-1 md:pb-3'>
                            Smartwatch 9
                        </h2>
                        <p className='text-xs text-gray-900 w-3/6 line-clamp-3 md:line-clamp-none'>
                            Shop the latest band style and colors.
                        </p>
                    </div>
                </div>
                <div className={`w-full h-full rounded-lg relative overflow-hidden`}>
                    <Image
                        src={"/images/catbanner-04.jpg"}
                        alt=""
                        fill
                        className='object-cover'
                    />
                    <div className='absolute top-0 right-0 left-0 pt-1 md:pt-5 pb-14 px-2 md:px-5'>
                        <small className='text-sm text-[#D0A291] font-semibold pb-1 md:pb-3'>
                            Free Engraving
                        </small>
                        <h2 className='font-semibold text-base md:text-2xl text-gray-900 pb-1 md:pb-3'>
                            Airpods Max
                        </h2>
                        <p className='text-xs text-gray-900 w-3/6 line-clamp-3 md:line-clamp-none'>
                            High Fidelity playback & Ultra-low Distortion
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerSection