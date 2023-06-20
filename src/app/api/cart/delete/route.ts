import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, prodId } = body;

        // finding the product to delete
        const product = await prisma.cart.findFirst({
            where: {
                AND: [
                    {
                        productId: prodId,
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
        const deleteProduct = await prisma.cart.delete({
            where: {
                id: product.id
            }
        })

        return NextResponse.json(deleteProduct);
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}