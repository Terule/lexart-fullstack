import { type Request, type Response } from 'express';
import type ISearch from '../Interfaces/searchInterface';
import { deleteSearchService, getSearchService, saveSearchService } from '../Services/searchService';
import { getProducts } from '../Utils/getProducts';
import { sorter } from '../Utils/sorter';

const searchController = async (req: Request, res: Response): Promise<void> => {
  const { website, query, category } = req.body as ISearch;
  console.log(req.body);
  if (!website || !query || !category) {
    res.status(400).json({ message: 'Teste' });
    return;
  }
  const scrapedProducts = await getProducts(website, query, category);
  const databaseProducts = await getSearchService(website, category);

  // If there are no products in the database, save the scraped products
  if (databaseProducts.length === 0) {
    await saveSearchService(scrapedProducts, website, category);
    res.status(200).json({ products: scrapedProducts });
    return;
  }

  // If there are products in the database, compare them with the scraped products
  const sortedProducts = sorter(scrapedProducts, databaseProducts);

  // If there are new products, save them
  if (sortedProducts.newProducts.length > 0) {
    await saveSearchService(sortedProducts.newProducts, website, category);
  }

  // If there are deleted products, delete them
  if (sortedProducts.deletedProducts.length > 0) {
    await deleteSearchService(sortedProducts.deletedProducts);
  }

  res.status(200).json({
    products: [...sortedProducts.newProducts, ...sortedProducts.existingProducts],
    deletedPRoducts: sortedProducts.deletedProducts
  });
};

export { searchController };
