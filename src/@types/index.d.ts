import { Brand, Categories, Products } from "@prisma/client";

export type Product = Products & {
    brand: Brand,
    category: Categories
}

export interface ProductType {
    id: string;
    title: string;
    image: string;
    price: number;
    rating: {
        rate: number
    };
    category: string;
}

export interface FeaturedProduct {
    id: string;
    name: string;
    image_sm: string;
    price: number;
    rating: number;
    brand: Brand;
    category: Categories
}