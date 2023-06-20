import {NextResponse} from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                cart: {
                    include: {
                        product: true,
                        user: true,
                    }
                }
            }
        });


        console.log(user)
        return NextResponse.json(user);
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}