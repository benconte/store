import prisma from "@/libs/prismadb"

export async function getCategories() {
    try {
        const categories = await prisma.categories.findMany()

        return categories;
    } catch (error) {
        console.log("Something went wrong.")
        return []
    }
}