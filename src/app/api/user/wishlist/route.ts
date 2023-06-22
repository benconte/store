import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            userId,
            prodId
        } = body;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { wishlist: true },
        });

        if (!user) {
            return new NextResponse("User not found.", { status: 404 })
        }

        // check if the product is in whishlist
        const productExistsInWishlist = user.wishlist.some(
            (item) => item.id === prodId
        );

        if (productExistsInWishlist) {
            const updatedUser = await prisma.user.update({
                include: {
                    wishlist: true,
                },
                where: {
                    id: user.id
                },
                data: {
                    wishlist: {
                        disconnect: {
                            id: prodId
                        }
                    }
                }
            })

            const productIds = updatedUser.wishlist.map((prod) => prod.id);
            return NextResponse.json(productIds);
        }

        const updatedUser = await prisma.user.update({
            include: {
                wishlist: true,
            },
            where: {
                id: user.id
            },
            data: {
                wishlist: {
                    connect: {
                        id: prodId
                    }
                }
            },
        })

        const productIds = updatedUser.wishlist.map((prod) => prod.id);
        return NextResponse.json(productIds);
    } catch (error) {
        console.log("[ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}