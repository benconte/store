import prisma from "@/libs/prismadb"

export async function getSpecialProducts() {
    try {
        // return products based on categories }
        const products = await prisma.products.findMany({
            skip: 5,
            take: 6,
            where: {
                OR: [
                    { category: { name: "Computer & Laptop" } },
                    { category: { name: "Smart Television" } },
                ]
            },
            include: {
                brand: true,
                category: true,
            },
        })

        return products;
    } catch (error) {
        console.log("ERROR", error)
        return []
    }
}