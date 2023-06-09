import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

export async function GET(request: Request) {
    try {
        const products = await prisma.products.findMany({
            select: {
                id: true,
                name: true,
                image_1: true,
                price: true,
                rating: true,
                brand: true,
                category: true
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        
    }
}