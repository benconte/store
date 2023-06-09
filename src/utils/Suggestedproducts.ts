export interface ProductSuggestions {
    productType: string;
    title: string;
    subtitle: string;
    image: string;
    background: string | "bg-black" | "bg-white"
}

export const suggestedProducts: ProductSuggestions[] = [
    {
        productType: "Smart Watch",
        title: "Smart Watch Series 7",
        subtitle: "From $20.04/mo for 24mo",
        image: "/images/famous-1.jpg",
        background: "bg-black",
    },
    {
        productType: "Studio Display",
        title: "600 nits of brightness.",
        subtitle: "27-inch 5K Retina display",
        image: "/images/famous-2.jpg",
        background: "bg-white",
    },
    {
        productType: "Smartphones",
        title: "Smartphone 15 pro",
        subtitle: "Now in green From #999.00 or $51.62/mo. for 24mo*",
        image: "/images/famous-3.jpg",
        background: "bg-white",
    },
    {
        productType: "Home Speakers",
        title: "Room-filling sound.",
        subtitle: "From $699 or $162/mo for 12mo*",
        image: "/images/famous-4.jpg",
        background: "bg-white",
    },
]