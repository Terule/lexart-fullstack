import type IProduct from '../Interfaces/productInterface';
import { getCheerio } from './scraper';

const mlScrapper = async (query: string): Promise<IProduct[]> => {
  const formatedQuery = query.replace(' ', '-');
  const $ = await getCheerio(`https://lista.mercadolivre.com.br/${formatedQuery}`);
  const products: IProduct[] = [];

  if (!$) {
    return products;
  }

  $('.ui-search-result').each((i, el) => {
    const priceElement = $(el).find('.ui-search-price__second-line')[0];
    const priceTag = $(priceElement).find('.price-tag-amount');
    const price = {
      currency: $(priceTag).find('.price-tag-symbol').text(),
      amount: $(priceTag).find('.price-tag-fraction').text(),
      decimals: $(priceTag).find('.price-tag-cents').text()
    };
    const product = {
      description: $(el).find('.ui-search-item__title').text() ?? '',
      price: `${price.currency} ${price.amount}.${price.decimals}` ?? '',
      image: $(el).find('.ui-search-result-image__element').attr('src') ?? '',
      url: $(el).find('.ui-search-link').attr('href') ?? ''
    };
    products.push(product);
  });

  return products;
};

export { mlScrapper };
