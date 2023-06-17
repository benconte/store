export function calculateFinalPrice(originalPrice: number, discount: number) {
    if (originalPrice <= 0 || discount <= 0) {
        return "Invalid input. Please provide positive values for both parameters.";
    }

    const discountAmount = originalPrice * (discount / 100);
    const finalPrice = originalPrice - discountAmount;

    return finalPrice.toFixed(2);
}
