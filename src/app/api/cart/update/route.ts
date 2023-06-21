import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { payload, userId } = body;

        // finding the product to delete
        const product = await prisma.cart.findFirst({
            where: {
                AND: [
                    {
                        productId: payload.product.id,
                    },
                    {
                        userId: userId,
                    }
                ]
            }
        })

        if (!product) {
            return new NextResponse("Product Not Found.", { status: 400 })
        }
        const newProduct = await prisma.cart.update({
            where: {
                id: product.id
            },
            data: {
                productOrdered: payload.productOrdered
            }
        })

        return NextResponse.json(newProduct);
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}