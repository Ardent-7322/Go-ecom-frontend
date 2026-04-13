export const formatUsdAsInr = (amount: number) => {
  // Backend stores prices in INR directly, no conversion needed
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
};