export function formatPrice(price: number) {
  const formatedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return formatedPrice.replace(/^(\D+)/, "$1 ");
}
