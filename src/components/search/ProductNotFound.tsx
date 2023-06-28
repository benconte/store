'use client'

import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import noproduct from "@/assets/no-product.json";

const ProductNotFound = () => {
    return (
        <div className='w-full h-5/6 py-24 bg-white flex flex-col text-sm text-gray-900 justify-center items-center gap-3'>
            <Player
                autoplay
                loop
                src={noproduct}
                style={{ height: '200px', width: '200px' }}
            >
                <Controls visible={false} />
            </Player>
            This Product does not exists
        </div>
    )
}

export default ProductNotFound