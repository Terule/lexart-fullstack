import type IProduct from '../Interfaces/productInterface';
import { bpScrapper } from '../Utils/buscape';
import { mlScrapper } from '../Utils/mercadoLivre';

const getProducts = async (web: string, query: string): Promise<IProduct[]> => {
  if (web === 'mercadoLivre') {
    const meliProducts = await mlScrapper(query);
    return meliProducts;
  }
  if (web === 'buscape') {
    const bpProducts = await bpScrapper(query);
    return bpProducts;
  }
  const meliProducts = await mlScrapper(query);
  const bpProducts = await bpScrapper(query);
  return [...meliProducts, ...bpProducts];
};

export { getProducts };
