import type IProduct from '../Interfaces/productInterface';
import { bpScrapper } from '../Utils/buscape';
import { mlScrapper } from '../Utils/mercadoLivre';

const getProducts = async (web: string, query: string, category: string): Promise<IProduct[]> => {
  if (web === 'mercadoLivre') {
    const meliProducts = await mlScrapper(query, category);
    return meliProducts;
  }
  if (web === 'buscape') {
    const bpProducts = await bpScrapper(query);
    return bpProducts;
  }
  const meliProducts = await mlScrapper(query, category);
  const bpProducts = await bpScrapper(query);
  return [...meliProducts, ...bpProducts];
};

export { getProducts };
