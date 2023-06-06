import { useMemo } from "react"

export function useBanner() {
    const bigBanner = useMemo(() => [
        {
            label: "supercharged for pros.",
            heading: "Special Sale",
            text: "From $999.99 or $41.72/mo. for 24 months.",
            image: "/images/mainbanner.jpg",
        },
        {
            label: "supercharged for pros.",
            heading: "IPad S15+ Pro.",
            text: "From $1300.00 or 58.82/mo. for 24 months.",
            image: "/images/mainbanner-1.jpg"
        },
    ], [])

    const smallBanner = useMemo(() => [
        {
            label: "Best Sale",
            heading: "laptops Max",
            text: "From $1699.00 or 64.62/mo.",
            image: "/images/catbanner-01.jpg"
        },
        {
            label: "New Arrival",
            heading: "Buy IPad Air",
            text: "From $899.00 or $49.62/mo.",
            image: "/images/catbanner-03.jpg"
        },
        {
            label: "15% OFF",
            heading: "Smartwatch 9",
            text: "Shop the latest band style and colors.",
            image: "/images/catbanner-02.jpg"
        },
        {
            label: "Free Engraving",
            heading: "Airpods Max",
            text: "High Fidelity playback & Ultra-low Distortion",
            image: "/images/catbanner-04.jpg"
        },
    ], [])

    return useMemo(() => ({ bigBanner, smallBanner }), [bigBanner, smallBanner])
}