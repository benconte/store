import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";
import { CartState } from "@/@types";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            cart
        }: { cart: CartState[] } = await body;
        
        if (!currentUser?.id) {
            return new NextResponse("unauthorized", { status: 400 })
        }

        for (let order of cart) {
            await prisma.orders.create({
                data: {
                    userId: currentUser?.id,
                    productId: order.product.id,
                    quantity: order.productOrdered
                }
            })
        };

        return new NextResponse("Order Placed", { status: 200 })
    } catch (error) {
        console.log("[ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}