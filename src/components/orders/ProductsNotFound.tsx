'use client'

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import noproduct from "@/assets/no-product.json";

const ProductsNotFound = () => {
    return (
        <div className='w-full h-5/6 py-24 bg-white flex flex-col text-sm md:text-base font-semibold text-gray-900 justify-center items-center gap-3 rounded-lg'>
            <Player
                autoplay
                loop
                src={noproduct}
                style={{ height: '200px', width: '200px' }}
            >
                <Controls visible={false} />
            </Player>
            You haven{`'`}t placed any orders
        </div>
    )
}

export default ProductsNotFound