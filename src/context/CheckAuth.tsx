'use client'

import { FC, useState } from 'react'
import { userAuthenticated, userNotAuthenticated } from "@/redux/features/authSlice"
import { addUser } from "@/redux/features/user-slice"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addGuest } from "@/redux/features/guestCart-slice"
import { CartState, UserState } from "@/@types"

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loading from "@/assets/loading.json";


interface CheckAuthProps {
    children: React.ReactNode;
    initialUser: UserState;
    initialGuest: CartState[];
    initialSessionStatus: boolean;
}

const CheckAuth: FC<CheckAuthProps> = ({ children, initialUser, initialGuest, initialSessionStatus }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!initialSessionStatus) {
            dispatch(userNotAuthenticated())
            dispatch(addGuest(initialGuest))

            setIsLoading(false)
        } else {
            dispatch(addUser(initialUser))
            dispatch(userAuthenticated())
            setIsLoading(false)
        }
    }, [dispatch, initialSessionStatus, initialUser, initialGuest])

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center">
                <div className="flex flex-col items-center">
                    <Player
                        autoplay
                        loop
                        src={loading}
                        style={{ height: '200px', width: '200px' }}
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

export default CheckAuth