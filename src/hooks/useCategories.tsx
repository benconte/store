import { useMemo } from "react"

export function useCategories() {
    const categories = useMemo(() => [
        {
            label: 'Computer & Laptop',
            stock: 6,
            image: "/images/laptop.jpg",
        },
        {
            label: 'Cameras & Videos',
            stock: 19,
            image: "/images/camera.jpg",
        },
        {
            label: 'Smart Television',
            stock: 12,
            image: "/images/tv.jpg",
        },
        {
            label: 'Smart Watches',
            stock: 13,
            image: "/images/watch-1.jpg",
        },
        {
            label: 'Music & Gaming',
            stock: 6,
            image: "/images/laptop.jpg",
        },
        {
            label: 'Mobiles & Tablets',
            stock: 6,
            image: "/images/tab.jpg",
        },
        {
            label: 'Headphones',
            stock: 6,
            image: "/images/headphone.jpg",
        },
        {
            label: 'Accessories',
            stock: 16,
            image: "/images/acc.jpg",
        },
        {
            label: 'Portable Speakers',
            stock: 6,
            image: "/images/speaker.jpg",
        },
        {
            label: 'Home Appliances',
            stock: 6,
            image: "/images/homeapp.jpg",
        },
    ], [])

    return categories;
}