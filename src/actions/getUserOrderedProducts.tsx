import prisma from "@/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export async function getUserOrderedProducts() {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser.id) {
            return [];
        }

        const orders = await prisma.orders.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                product: {
                    include: {
                        brand: true,
                        category: true
                    }
                }
            }
        });

        return orders;
    } catch (error) {
        console.log("[ERROR]", error);
        return [];
    }
}