'use client'

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loading from "@/assets/loading.json";

// const productPlayer = require("@/assets/product-loading.json");

const Loading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
                <Player
                    autoplay
                    loop
                    src={loading}
                    style={{ height: '200px', width: '200px' }}
                >
                    <Controls visible={false} />
                </Player>
            </div>
        </div>
    )
}

export default Loading