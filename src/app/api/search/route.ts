import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { search } = body;

        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: "insensitive"
                }
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log("ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
