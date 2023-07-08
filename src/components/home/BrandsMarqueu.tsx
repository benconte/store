import React from 'react'
import Marquee from "react-fast-marquee";
import { brands } from "@/utils/Brands"
import Image from 'next/image';

const BrandsMarqueu = () => {
    return (
        <Marquee
            autoFill
            className='overflow-hidden shadow rounded-lg mt-7 sm:mt-12'
        >
            <div className='w-full flex items-center gap-16 sm:gap-20 bg-white mr-20'>
                {brands.map((brand: string, index: number) => (
                    <div
                        key={index}
                        className="relative w-20 h-20 sm:w-28 sm:h-28"
                    >
                        <Image
                            src={brand}
                            alt="brand"
                            fill
                            className='object-contain'
                        />
                    </div>
                ))}
            </div>
        </Marquee>
    )
}

export default BrandsMarqueu