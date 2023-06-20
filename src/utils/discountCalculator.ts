export function calculateFinalPrice(originalPrice: number, discount: number) {
    if (originalPrice <= 0 || discount <= 0) {
        return originalPrice;
    }

    const discountAmount = originalPrice * (discount / 100);
    const finalPrice = originalPrice - discountAmount;

    return Number(finalPrice.toFixed(2));
}
