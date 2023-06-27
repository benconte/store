import prisma from "@/libs/prismadb"

export async function fetchAllProducts(category: string) {
    try {
        if (category && category.length > 0) {
            const products = await prisma.products.findMany({
                where: {
                    category: {
                        name: category
                    }
                },
                include: {
                    category: true,
                    brand: true,
                }
            });

            return products;
        }

        const products = await prisma.products.findMany({
            include: {
                category: true,
                brand: true
            }
        });
        return products;
    } catch (error) {
        console.log("Something went wrong")
        return [];
    }
}