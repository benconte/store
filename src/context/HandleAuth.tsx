'use client'

import { userAuthenticated, userNotAuthenticated } from "@/redux/features/authSlice"
import { addUser } from "@/redux/features/user-slice"
import { AppDispatch } from "@/redux/store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

interface HandleAuthProps {
    children: React.ReactNode
}

function HandleAuth({ children }: HandleAuthProps) {
    const dispatch = useDispatch<AppDispatch>()
    const session = useSession()

    useEffect(() => {
        if (session?.status !== "authenticated") {
            dispatch(userNotAuthenticated())
        } else {

            axios.post("/api/user", { email: session?.data?.user?.email })
                .then((response) => {
                    dispatch(addUser(response.data))
                    dispatch(userAuthenticated())
                })
                .catch((error) => console.log(error))
        }
    }, [session, dispatch])
    return (
        <div>{children}</div>
    )
}

export default HandleAuth