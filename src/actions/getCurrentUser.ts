import prisma from "@/libs/prismadb";
import getSession from "./getSession";
import { UserState } from "@/@types";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return {} as UserState
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        wishlist: true,
        cart: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            user: true,
          }
        }
      }
    });

    if (!currentUser) {
      return {} as UserState
    }

    const wishlistProductIds: string[] = currentUser.wishlist.map((prod) => prod.id)

    const updatedUser: UserState = {
      ...currentUser,
      wishlist: wishlistProductIds
    }

    return updatedUser;
  } catch (error: any) {
    return {} as UserState
  }
};

export default getCurrentUser;
