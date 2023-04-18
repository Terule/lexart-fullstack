import type IProduct from '../Interfaces/productInterface';
import { getCheerio } from './scraper';

const bpScrapper = async (query: string): Promise<IProduct[]> => {
  const formatedQuery = query.replace(' ', '%20');
  const $ = await getCheerio(`https://buscape.com.br/search?q=${formatedQuery}`);
  const products: IProduct[] = [];

  if (!$) {
    return products;
  }

  $('[data-testid="product-card"]').each((i, el) => {
    const link = $(el).find('.SearchCard_ProductCard_Inner__7JhKb').attr('href');
    let image: string | undefined = '';
    if ($(el).find('.SearchCard_ProductCard_Image__ffKkn').find('img').attr('src')?.split(':')[0] === 'data') {
      image = $(el).find('.SearchCard_ProductCard_Image__ffKkn').find('img').attr('data-src');
      console.log(image);
    } else {
      image = $(el).find('.SearchCard_ProductCard_Image__ffKkn').find('img').attr('src');
    }
    const product = {
      url: `https://www.buscape.com.br${link ?? ''}` ?? '',
      image: image ?? '',
      price: $(el).find('[data-testid="product-card::price"]').text() ?? '',
      description: $(el).find('[data-testid="product-card::name"]').text() ?? ''
    };
    products.push(product);
  });

  return products;
};

export { bpScrapper };
