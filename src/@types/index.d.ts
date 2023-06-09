import { Brand, Categories, Products } from "@prisma/client";

export type Product = Products & {
    brand: Brand,
    category: Categories
}