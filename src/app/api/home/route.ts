import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import axios from "axios";
import { ProductType } from "@/@types";

export async function POST(request: Request) {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status !== 200) {
            console.log("Unablbe to fetch data")
            return new NextResponse(null, { status: 400 })
        }

        // Check the response data
        console.log(response.data);

        for (const record of response.data) {
            const alreadyExists = await prisma.productRecords.findFirst({
                where: {
                    name: record.title
                }
            });

            // if we have a product
            if (alreadyExists && alreadyExists !== null) {
                console.log("Product already exists")
                continue;
            }

            console.log(record)
            await prisma.productRecords.create({
                data: {
                    name: record.title,
                    price: record.price,
                    discount: null,
                    rating: record.rating.rate,
                    description: record.description,
                    image_1: record.image,
                    image_2: null,
                    image_3: null,
                    stock: Math.floor(Math.random() * 100),
                    category: {
                        connect: {
                            id: "64805a08d9560a712278e39f"
                        }
                    },
                    brand: {
                        connect: {
                            id: "64809d24d9b0978709472b20"
                        }
                    }
                },
                include: {
                    brand: true,
                    category: true,
                }
            });
        }

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong.", { status: 500 });
    }
}
