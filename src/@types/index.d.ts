import { Brand, Cart, Categories, Products, User } from "@prisma/client";

export type Product = Products & {
    brand: Brand,
    category: Categories,
}

// type related to user cart
export type UserState = User & {
    cart: CartState[]
}

export type CartState = {
    product: Product;
    productOrdered: number;
}