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
    });

    if (!currentUser) {
      return {} as UserState
    }

    return currentUser;
  } catch (error: any) {
    return {} as UserState
  }
};

export default getCurrentUser;
