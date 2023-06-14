import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const products = await prisma.productRecords.findMany({
            where: {
                OR: [
                    { category: { name: "Computer & Laptop" } },
                    { category: { name: "Smart Television" } },
                    { category: { name: "Accessories" } },
                ]
            },  
            include: {
                brand: true,
                category: true,
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.log(error, "ERROR")
        return NextResponse.json([])
    }
}