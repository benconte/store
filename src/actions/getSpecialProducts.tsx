import prisma from "@/libs/prismadb"

export async function getSpecialProducts() {
    // return products based on categories }
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

    return products;
}