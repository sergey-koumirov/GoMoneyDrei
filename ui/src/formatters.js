export const money = (v) => {
  return (v / 100.0)
    .toLocaleString("ru-RU", { minimumFractionDigits: 2 })
    .replace(",", ".");
};

export const stock = (v) => {
  return (v / 100.0)
    .toLocaleString("ru-RU", { minimumFractionDigits: 0 })
    .replace(",", ".");
};

export const percent = (v) => {
  return (Math.round(v * 100.0 * 10.0) / 10.0)
    .toLocaleString("ru-RU", { minimumFractionDigits: 1 })
    .replace(",", ".");
};
