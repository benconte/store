'use client'

import { User } from '@prisma/client'
import { FC } from 'react'
import { userAuthenticated, userNotAuthenticated } from "@/redux/features/authSlice"
import { addUser } from "@/redux/features/user-slice"
import { AppDispatch } from "@/redux/store"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserState } from '@/@types'

interface CheckAuthProps {
    children: React.ReactNode;
    user: UserState;
}

const CheckAuth: FC<CheckAuthProps> = ({ user, children }) => {
    const dispatch = useDispatch<AppDispatch>()

    console.log(user)
    // if (!user || user === null) {
    //     dispatch(userNotAuthenticated())
    // }

    // if (user) {
    //     dispatch(userAuthenticated())
    //     dispatch(addUser(user))
    // }

    return <div>{children}</div>
}

export default CheckAuth