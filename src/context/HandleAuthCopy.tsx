import { CartState, UserState } from "@/@types";
import getCurrentUser from "@/actions/getCurrentUser"
import axios from "axios";
import CheckAuth from "./CheckAuth";

interface HandleAuthCopyProps {
    children: React.ReactNode
}

async function HandleAuthCopy({ children }: HandleAuthCopyProps) {
    const currentUser = await getCurrentUser();
    

    const initialSessionStatus = currentUser ? true : false;
    const guestLocalCart = localStorage.getItem('guestCart');
    const initialGuest: CartState[] = guestLocalCart !== null ?
     JSON.parse(localStorage.getItem('guestCart') || '[]') : localStorage.setItem("guestCart", "[]");

    const initialUser = currentUser

    return (
        <CheckAuth
            initialGuest={initialGuest}
            initialUser={initialUser}
            initialSessionStatus={initialSessionStatus}
        >
            {children}
        </CheckAuth>
    )
}

export default HandleAuthCopy