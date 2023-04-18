import type IProduct from '../Interfaces/productInterface';
import { deleteSearchModel, getSearchModel, saveSearchModel } from '../Models/searchModel';

const saveSearchService = async (products: IProduct[], website: string, category: string): Promise<void> => {
  await saveSearchModel(products, website, category);
};

const getSearchService = async (website: string, category: string): Promise<IProduct[]> => {
  const products = await getSearchModel(website, category);
  return products;
};

const deleteSearchService = async (products: IProduct[]): Promise<void> => {
  await deleteSearchModel(products);
};

export { saveSearchService, getSearchService, deleteSearchService };
