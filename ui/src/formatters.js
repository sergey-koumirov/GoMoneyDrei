export const money = (v) => {
    return (v / 100.0).toLocaleString('ru-RU', {minimumFractionDigits: 2}).replace(",",".")
}