import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(request: Request) {
    try {

        const alreadyExists = await prisma.products.findFirst({
            where: {
                name: `Apple 2022 MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB ​​​​​​​SSD ​​​​​​​Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Space Gray`
            }
        });

        if (alreadyExists) {
            return new NextResponse("Product already exists", { status: 400 })
        }

        const newRecord = await prisma.products.create({
            data: {
                name: "Apple 2022 MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB ​​​​​​​SSD ​​​​​​​Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Space Gray",
                price: 1448.05,
                discount: null,
                rating: 4.7,
                description: `
                SUPERCHARGED BY M2 — The 13-inch MacBook Pro laptop is a portable powerhouse. Get more done faster with a next-generation 8-core CPU, 10-core GPU and up to 24GB of unified memory.
UP TO 20 HOURS OF BATTERY LIFE — Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.
SUSTAINED PERFORMANCE — Thanks to its active cooling system, the 13-inch MacBook Pro can sustain pro levels of performance, so you can run CPU- and GPU-intensive tasks for hours on end.
BRILLIANT DISPLAY — The 13.3-inch Retina display features 500 nits of brightness and P3 wide colour for vibrant images and incredible detail.
HD CAMERA AND STUDIO-QUALITY MICS — Look sharp and sound great with a FaceTime HD camera and three-mic array.
VERSATILE CONNECTIVITY — Two Thunderbolt ports let you connect and power high-speed accessories.
EASY TO USE — Your Mac feels familiar from the moment you turn it on, and it works seamlessly with all your Apple devices.
SIMPLY COMPATIBLE — All your go-to apps run lightning-fast — including Microsoft 365, Zoom, and many of your favourite iPhone and iPad apps.
COMES WITH APPLECARE WARRANTY – Every Mac comes with a one-year limited warranty and up to 90 days of complimentary technical support. Get AppleCare+ to extend your coverage.
                `,
                image_1: "/images/products/macbook.jpg",
                image_2: "/images/products/macbook_2.jpg",
                image_3: "/images/products/macbook_3.jpg",
                stock: 84,
                category: {
                    connect: {
                        id: "64805a08d9560a712278e39f"
                    }
                },
                brand: {
                    connect: {
                        id: "64809d25d9b0978709472b21"
                    }
                }
            },
            include: {
                brand: true,
                category: true,
            }
        });

        return newRecord;
    } catch (error) {
        return new NextResponse("Something went wrong.", { status: 500 })
    }
}