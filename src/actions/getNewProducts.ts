import { useMemo } from "react";
import prisma from "@/libs/prismadb"

export async function getNewProducts() {
    try {
        const products = await prisma.products.findMany({
            include: {
                brand: true,
                category: true
            },
            take: 11
        });

        return products;
    } catch (error) {
        console.log("ERROR", error)
        return []
    }
}
