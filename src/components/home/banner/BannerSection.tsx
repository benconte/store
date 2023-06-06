'use client'

import React, { FC } from 'react'
import { useBanner } from '@/hooks/useBanner'
import clsx from 'clsx';
import ImgSlider from './ImgSlider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

            <div className='grid grid-cols-2 gap-3'>
                <div className={`bg-[url('/images/catbanner-01.jpg')] bg-no-repeat bg-center pt-5 pb-14 px-5 rounded-lg`}>
                    <small className='text-sm text-[#D0A291] font-semibold pb-3'>
                        Best Sale
                    </small>
                    <h2 className='font-semibold text-2xl text-gray-900 pb-3'>
                        laptops Max
                    </h2>
                    <p className='text-sm text-gray-900 w-4/6'>
                        From $1699.00 or 64.62/mo.
                    </p>
                </div>
                <div className={`bg-[url('/images/catbanner-03.jpg')] bg-auto bg-no-repeat overflow-hidden bg-center pt-5 pb-14 px-5 rounded-lg`}>
                    <small className='text-sm text-[#D0A291] font-semibold pb-3'>
                        New Arrival
                    </small>
                    <h2 className='font-semibold text-2xl text-gray-900 pb-3'>
                        Buy IPad Air
                    </h2>
                    <p className='text-sm text-gray-900 w-4/6'>
                        From $899.00 or $49.62/mo.
                    </p>
                </div>
                <div className={`bg-[url('/images/catbanner-04.jpg')] bg-no-repeat bg-center pt-5 pb-14 px-5 rounded-lg`}>
                    <small className='text-sm text-[#D0A291] font-semibold pb-3'>
                        Free Engraving
                    </small>
                    <h2 className='font-semibold text-2xl text-gray-900 pb-3'>
                        Airpods Max
                    </h2>
                    <p className='text-sm text-gray-900 w-4/6'>
                        High Fidelity playback & Ultra-low Distortion
                    </p>
                </div>
                <div className={`bg-[url('/images/catbanner-02.jpg')] bg-no-repeat bg-center pt-5 pb-14 px-5 rounded-lg`}>
                    <small className='text-sm text-[#D0A291]'>
                        15% OFF
                    </small>
                    <h2 className='font-semibold text-2xl text-gray-900'>
                        Smartwatch 9
                    </h2>
                    <p className='text-sm text-gray-900 w-4/6'>
                        Shop the latest band style and colors.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default BannerSection