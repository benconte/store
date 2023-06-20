import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, payload } = body;

        const product = await prisma.cart.create({
            include: {
                user: true
            },
            data: {
                userId: userId,
                productId: payload.product.id,
                productOrdered: payload.productOrdered
            }
        })

        return NextResponse.json(product);
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}