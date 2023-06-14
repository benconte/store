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
    description: string;
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

// products from fakestoreapi
export interface CustomProductProps {
    id: string;
    name: string;
    price: number;
    image_sm: string | null;
    rating: number;
    brand: Brand;
    category: Categories;
  }
  
export type SpecialproductsProps = ProductRecords & {
    brand: Brand,
    category: Categories,
  }