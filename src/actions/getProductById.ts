import prisma from "@/libs/prismadb"

export async function getProductById(productId: string) {
    try {
        const products = await prisma.products.findUnique({
            where: {
                id: productId
            },
            include: {
                category: true,
                brand: true
            },
        });

        return products;
    } catch (error) {
        console.log("ERROR", error)
        return null
    }
}
