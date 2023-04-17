import { PrismaClient, type search } from '@prisma/client';
import type IProduct from '../Interfaces/productInterface';

const prisma = new PrismaClient();

const saveSearchModel = async (products: IProduct[], website: string, category: string): Promise<void> => {
  products.forEach(async (product) => {
    await prisma.search.create({
      data: {
        description: product.description,
        image: product.image,
        price: product.price,
        url: product.url,
        category,
        website
      }
    });
  });
};

const getSearchModel = async (website: string, category: string): Promise<search[]> => {
  if (website === 'todos') {
    const products = await prisma.search.findMany({
      where: {
        category
      }
    });
    return products;
  }
  const products = await prisma.search.findMany({
    where: {
      website,
      category
    }
  });
  return products;
};

const deleteSearchModel = async (products: IProduct[]): Promise<void> => {
  products.forEach(async (product) => {
    await prisma.search.delete({
      where: {
        id: product.id as number
      }
    });
  });
};

export { saveSearchModel, getSearchModel, deleteSearchModel };
