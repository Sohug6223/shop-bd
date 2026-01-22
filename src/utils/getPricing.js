export default function getPricing(cart) {
  const SHIPPING_FREE = 3000;
  const SHIPPING_COST = 100;
  const TAX_RATE = 0.1;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isFreeShipping = subtotal >= SHIPPING_FREE;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_COST;

  const totalBeforeTax = subtotal + shippingCost;
  const tax = Math.round(totalBeforeTax * TAX_RATE);
  const grandTotal = totalBeforeTax + tax;

  return {
    subtotal,
    shippingCost,
    tax,
    grandTotal,
    isFreeShipping,
    remainingForFreeShipping: Math.max(
      SHIPPING_FREE - subtotal,
      0
    )
  };
}
