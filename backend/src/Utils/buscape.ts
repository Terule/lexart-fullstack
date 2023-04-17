import type IProduct from '../Interfaces/productInterface';
import { getCheerio } from './scraper';

const bpScrapper = async (query: string): Promise<IProduct[]> => {
  const formatedQuery = query.replace(' ', '%20');
  const $ = await getCheerio(`https://buscape.com.br/search?q=${formatedQuery}`);
  const products: IProduct[] = [];

  if (!$) {
    return products;
  }

  $('.SearchCard_ProductCard__1D3ve').each((i, el) => {
    const product = {
      url: $(el).find('.SearchCard_ProductCard_Inner__7JhKb').attr('href') ?? '',
      image: $(el).find('[decoding="async"]').attr('src') ?? '',
      price: $(el).find('[data-testid="product-card::price"]').text() ?? '',
      description: $(el).find('[data-testid="product-card::name"]').text() ?? ''
    };
    products.push(product);
  });

  return products;
};

export { bpScrapper };
