import { Brand, Cart, Categories, Products, User } from "@prisma/client";

export type Product = Products & {
    brand: Brand,
    category: Categories,
}

export type ProductCart = Products & {
    brand: Brand,
    category: Categories,
} & {
    productOrdered: number;
}

// type related to user cart
export type UserState = User & {
    cart: CartState
}

export type CartState = Cart & {
    cartProduct: CartProduct[]
}

export type CartProduct = {
    product: Product;
    productOrdered: number;
}