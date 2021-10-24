export function normalizePrices(product) {
  if (!product) {
    return;
  }

  if (product.price) {
    if (product.price.low === null) {
      product.price.low = 0;
    }
    if (product.price.high === null) {
      product.price.high = 0;
    }
    product.price.avg = (product.price.low + product.price.high) / 2;
  }

  return product;
}