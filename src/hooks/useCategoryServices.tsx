import { useMemo } from "react"

export function useCategoryServices() {

    const services = useMemo(() => [
        {
            title: "Free Shipping",
            subtitle: "From all orders over $100",
            image: "/images/service.png"
        },
        {
            title: "Daily Suprise Offers",
            subtitle: "Save up to 20% off",
            image: "/images/service-02.png"
        },
        {
            title: "Support24/7",
            subtitle: "Shop with an export",
            image: "/images/service-03.png"
        },
        {
            title: "Affordable Prices",
            subtitle: "Get Factory Direct Prices",
            image: "/images/service-04.png"
        },
        {
            title: "Secure payments",
            subtitle: "100% Procted Prices",
            image: "/images/service-05.png"
        },
    ], [])

    return services;
}