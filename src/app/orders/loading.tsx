'use client'

import Lottie from 'react-lottie-player'
import loading from "@/assets/loading.json";

// const productPlayer = require("@/assets/product-loading.json");

const Loading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
                <Lottie
                    loop
                    animationData={loading}
                    play
                    style={{ width: 200, height: 200 }}
                />
            </div>
        </div>
    )
}

export default Loading