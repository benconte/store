import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";
import bcrypt, { compare } from "bcrypt"

export async function POST(request: Request) {
    const body = await request.json()
    const {
        name, email, image, oldPassword, newPassword
    } = body;

    try {
        const currentUser = await getCurrentUser()

        if (!currentUser.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        })

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (oldPassword && newPassword) {
            if (user.hashedPassword) {
                // if account was created through credentials not provider
                const match = await compare(oldPassword, user.hashedPassword);

                if (match) {
                    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            name,
                            email,
                            image,
                            hashedPassword: hashedNewPassword
                        }
                    })

                    return NextResponse.json({
                        message: "Profile Updated Successfully.",
                        passwordChanged: true
                    })
                } else {
                    return new NextResponse("Invalid Credentials", { status: 400 })
                }
            }

        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name,
                email,
                image,
            }
        });

        return NextResponse.json({
            message: "Profile Updated Successfully.",
            passwordChanged: false
        })
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal server error", { status: 500 })
    }

}