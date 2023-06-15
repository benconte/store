import React from 'react'
import Marquee from "react-fast-marquee";
import { brands } from "@/utils/Brands"
import Image from 'next/image';

const BrandsMarqueu = () => {
    return (
        <Marquee
            autoFill
            className='overflow-hidden shadow rounded-lg mt-12'
        >
            <div
                className='w-full flex items-center gap-20 bg-white mr-20'
            >

                {brands.map((brand: string, index: number) => (
                    <Image
                        key={index}
                        src={brand}
                        alt="brand"
                        width={100}
                        height={100}
                        className='object-contain'
                    />
                ))}
            </div>
        </Marquee>
    )
}

export default BrandsMarqueu