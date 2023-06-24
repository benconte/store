import { Brand, Cart, Categories, Products, User } from "@prisma/client";

export type Product = Products & {
    brand: Brand,
    category: Categories,
}

// type related to user
export type UserState = User & {
    wishlist: Product[]
} & {
    cart: CartState[]
}

// user cart type
export type CartState = {
    product: Product;
    productOrdered: number;
}