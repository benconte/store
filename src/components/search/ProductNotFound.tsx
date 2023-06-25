'use client'

import React from 'react'
import Lottie from 'react-lottie-player'
import noproduct from "@/assets/no-product.json";

const ProductNotFound = () => {
    return (
        <div className='w-full h-5/6 py-24 bg-white flex flex-col text-sm text-gray-900 justify-center items-center gap-3'>
            <Lottie
                loop
                animationData={noproduct}
                play
                style={{ width: 200, height: 200 }}
            />
            This Product does not exists
        </div>
    )
}

export default ProductNotFound