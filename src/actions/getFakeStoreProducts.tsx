import { Brand, Categories } from "@prisma/client";
import axios from "axios";

interface ProductType {
    id: string;
    title: string;
    image: string;
    price: number;
    rating: {
        rate: number
    };
    category: string;
}

interface Product {
    id: string;
    name: string;
    image_sm: string;
    price: number;
    rating: number;
    brand: Brand;
    category: Categories
}

export async function getFakeStoreProducts() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const data = response.data;

    const newProducts: Product[] = data.map((prod: ProductType) => ({
        id: prod.id,
        name: prod.title,
        image_sm: prod.image,
        price: prod.price,
        rating: prod.rating.rate,
        brand: {
            name: 'Sony',
        },
        category: {
            name: prod.category,
        },
    }));

    return newProducts;
}
