'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Brand, Categories } from '@prisma/client';
import Image from 'next/image';
import { handleStars } from '@/actions/handleStars';
import { CustomProductProps } from '@/@types';

const FeaturedProducts = ({ products }: { products: CustomProductProps[] }) => {
    console.log("Testing products", products)
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
            <h2 className='text-sm md:text-lg text-gray-900 font-semibold'>Featured Products</h2>

            <Slider {...settings} className='w-full grid grid-cols-1 product-slide mt-4 products-collection'>
                {products && products.map((product: CustomProductProps, index) => (
                    <div key={index} className='relative grid grid-cols-1 h-full p-4 shadow-md rounded-lg bg-white group cursor-pointer'>
                        <div className='absolute top-1 right-1 z-20 bg-white'>
                            <FavoriteBorderIcon className="2-8 h-8 cursor-pointer text-gray-600 hover:text-gray-900" />
                        </div>
                        <div className='relative w-full h-40 z-10 flex items-center justify-center mt-8 mb-5'>
                            <Image
                                src={product.image_sm ? product.image_sm : ""}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
                                className='w-auto h-auto bg-white object-contain group-hover:scale-110 transition'
                            />
                        </div>
                        {/* FA5655 */}
                        <div className='flex-1 flex flex-col gap-3'>
                            <p className='text-sm text-[#F9B96E] font-semibold'>Brand: {product.brand.name}</p>
                            <h3 className="text-sm text-gray-900 line-clamp-2">{product.name}</h3>
                            <div>
                                {handleStars(product.rating)}
                            </div>
                            <p className="text-sm text-gray-900">${product.price}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default FeaturedProducts