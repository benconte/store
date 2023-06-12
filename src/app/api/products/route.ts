import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import { FeaturedProduct, ProductType } from "@/@types";
import axios from "axios";

// export async function GET(request: Request) {
//     try {
//         const products = await prisma.products.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 image_1: true,
//                 price: true,
//                 rating: true,
//                 brand: true,
//                 category: true
//             }
//         });

//         return NextResponse.json(products);
//     } catch (error) {

//     }
// }

export async function GET(request: Request) {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;

        const newProducts: FeaturedProduct[] = data.map((prod: ProductType) => ({
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

        return NextResponse.json(newProducts);
    } catch (error) {

    }
}