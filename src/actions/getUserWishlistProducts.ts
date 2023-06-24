import prisma from "@/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export async function getUserWishlistProducts() {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser.id) {
            return [];
        }

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id,
            },
            include: {
                wishlist: {
                    include: {
                        brand: true,
                        category: true
                    }
                },
            }
        });

        return user?.wishlist;
    } catch (error) {
        console.log("Something went wrong.")
        return [];
    }
}