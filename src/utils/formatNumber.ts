export function formatNumber(number: number) {
  const formatter = new Intl.NumberFormat("en-ke", {
    localeMatcher:'best fit',
    style: "decimal",
    notation: "compact",
    compactDisplay:'short',
  });
  return formatter.format(number);
}

export const formatCurrency = (amount: number) => {
  // Format the price as Kenyan currency
  const formatter = new Intl.NumberFormat("en-Ke", {
    style: "currency",
    currency: "KES",
  });
  return formatter.format(amount);
};
