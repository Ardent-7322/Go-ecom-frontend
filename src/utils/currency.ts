const USD_TO_INR_RATE = 83;

export const convertUsdToInr = (amount: number) => {
  const value = Number(amount || 0);
  return value * USD_TO_INR_RATE;
};

export const formatINR = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

export const formatUsdAsInr = (amount: number) => {
  return formatINR(convertUsdToInr(amount));
};
