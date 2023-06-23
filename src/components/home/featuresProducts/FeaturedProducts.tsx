'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from '@/@types';
import FeaturedProduct from './Product';

const FeaturedProducts = ({ products, heading }: { products: Product[], heading: string }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 3,
        cssEase: "linear",
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='w-full pb-10'>
            <h2 className='text-sm md:text-lg text-gray-900 font-semibold'>{heading}</h2>

            <Slider {...settings} className='w-full grid grid-cols-1 product-slide mt-4 products-collection'>
                {products && products.map((product: Product, index) => (
                    <FeaturedProduct key={index} product={product} />
                ))}
            </Slider>
        </div>
    )
}

export default FeaturedProducts