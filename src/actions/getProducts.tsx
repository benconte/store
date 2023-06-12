import { useMemo } from "react";
import prisma from "@/libs/prismadb"

export async function getProducts() {
    try {
        const products = await prisma.products.findMany({
            select: {
                id: true,
                name: true,
                image_sm: true,
                price: true,
                rating: true,
                brand: true,
                category: true
            }
        });

        return products;
    } catch (error) {
        console.log("ERROR", error)
        return []
    }
}
