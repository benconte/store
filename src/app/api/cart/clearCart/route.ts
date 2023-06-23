import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser"

export async function POST() {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        await prisma.user.update({
            include: {
                cart: true
            },
            where: {
                id: currentUser?.id
            },
            data: {
                cart: {
                    deleteMany: {}
                }
            }
        });
        
        return new NextResponse("Cart Cleared", { status: 200 })
    } catch (error) {
        console.log("[ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}