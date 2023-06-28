'use client'

import { userAuthenticated, userNotAuthenticated } from "@/redux/features/authSlice"
import { addUser } from "@/redux/features/user-slice"
import { addGuest } from "@/redux/features/guestCart-slice"
import { CartState } from "@/@types"
import { AppDispatch } from "@/redux/store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loading from "@/assets/loading.json";

interface HandleAuthProps {
    children: React.ReactNode
}

function HandleAuth({ children }: HandleAuthProps) {
    const dispatch = useDispatch<AppDispatch>()
    const session = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [guestCart, setGuestCart] = useState<CartState[]>([])

    useEffect(() => {
        if (session?.status !== "authenticated") {
            dispatch(userNotAuthenticated())

            setGuestCart(JSON.parse(localStorage.getItem('guestCart') || '[]'));
            dispatch(addGuest(guestCart))

            setIsLoading(false)
        } else {

            axios.post("/api/user", { email: session?.data?.user?.email })
                .then((response) => {
                    dispatch(addUser(response.data))
                    dispatch(userAuthenticated())
                    setIsLoading(false)
                })
                .catch((error) => console.log(error))
        }
    }, [session, dispatch])


    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center">
                <div className="flex flex-col items-center">
                    <Player
                        autoplay
                        loop
                        src={loading}
                        style={{ height: '300px', width: '300px', marginTop: 100 }}
                    >
                        <Controls visible={false} />
                    </Player>
                    <h3 className='text-lg font-semibold text-gray-900 mt-4 text-center'>Loading...</h3>
                </div>
            </div>
        )
    }
    return (
        <div>{children}</div>
    )
}

export default HandleAuth