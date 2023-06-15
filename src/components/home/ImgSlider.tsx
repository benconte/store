'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImgSlider = () => {
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
        <Slider {...settings} className="banner-slider w-full lg:w-6/12 h-52 md:h-96">
            <div className={`h-52 md:h-96 bg-[url('/images/main-banner.jpg')] bg-center bg-no-repeat pt-10 pb-14 rounded-lg px-5 md:px-10 overflow-hidden`}>
                <small className='text-sm text-[#D0A291] font-semibold pb-3'>
                    supercharged for pros.
                </small>
                <h2 className='font-semibold text-xl md:text-3xl text-gray-900 pb-3'>
                    Special Sale
                </h2>
                <p className='text-sm text-gray-900 w-3/6'>
                    From $999.99 or $41.72/mo. for 24 months.
                </p>
            </div>
            <div className={`h-52 md:h-96 bg-[url('/images/main-banner-1.jpg')] bg-center bg-no-repeat pt-10 pb-14 rounded-lg px-6 md:px-10  overflow-hidden`}>
                <small className='text-sm text-[#D0A291] font-semibold pb-3'>
                    supercharged for pros.
                </small>
                <h2 className='font-semibold text-xl md:text-3xl text-gray-900 pb-3'>
                    IPad S15+ Pro.
                </h2>
                <p className='text-sm text-gray-900 w-3/6'>
                    From $1300.00 or 58.82/mo. for 24 months.
                </p>
            </div>
        </Slider>
    )
}

export default ImgSlider