import prisma from "@/libs/prismadb"

export async function getProducts() {
    try {
        const products = await prisma.products.findMany({
            skip: 11,
            take: 20,
            include: {
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
