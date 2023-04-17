import type IProduct from '../Interfaces/productInterface';
import { type ISorted } from '../Interfaces/sortedInterface';

const sorter = (scrapedProducts: IProduct[], databaseProducts: IProduct[]): ISorted => {
  const existingProducts: IProduct[] = [];
  const newProducts: IProduct[] = [];
  const deletedProducts: IProduct[] = [];
  scrapedProducts.forEach((product) => {
    const found = databaseProducts.find((search) => search.description === product.description);
    if (found) {
      existingProducts.push(product);
    } else {
      newProducts.push(product);
    }
  });
  databaseProducts.forEach((product) => {
    const found = scrapedProducts.find((search) => search.description === product.description);
    if (!found) {
      deletedProducts.push(product);
    }
  });
  return { existingProducts, newProducts, deletedProducts };
};

export { sorter };
