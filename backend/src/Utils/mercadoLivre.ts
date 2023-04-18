import type IProduct from '../Interfaces/productInterface';
import { getCheerio } from './scraper';

const getFormattedCategory = (category: string): string => {
  let formatedCategory = '';
  if (category === 'geladeira') {
    formatedCategory = 'eletrodomesticos/refrigeracao/geladeiras/';
  }
  if (category === 'celular') {
    formatedCategory = 'celulares-telefones/celulares-smartphones/';
  }
  if (category === 'tv') {
    formatedCategory = 'eletronicos-audio-video/televisores/';
  }
  return formatedCategory;
};

const getFormattedQuery = (category: string, query: string): string => {
  let formatedQuery = `${query.replace(' ', '-')}#D[A:${query.replace(' ', '%20')}]`;
  if (category !== 'todas') {
    formatedQuery = `${query.replace(' ', '-')}_NoIndex_True#D[A:${query.replace(' ', '%20')},on]`;
  }
  return formatedQuery;
};

const mlScrapper = async (query: string, category: string): Promise<IProduct[]> => {
  const formatedCategory = getFormattedCategory(category);
  const formatedQuery = getFormattedQuery(category, query);
  const $ = await getCheerio(
    formatedCategory !== ''
      ? `https://lista.mercadolivre.com.br/${formatedCategory}${formatedQuery}`
      : `https://lista.mercadolivre.com.br/${formatedQuery}`);
  const products: IProduct[] = [];

  if (!$) {
    return products;
  }

  $('.ui-search-result').each((i, el) => {
    const priceElement = $(el).find('.ui-search-price__second-line')[0];
    const priceTag = $(priceElement).find('.price-tag-amount');
    const price = $(priceTag).text();
    let image: string | undefined = '';
    if ($(el).find('.shops__image-element').attr('src')?.split(':')[0] === 'data') {
      image = $(el).find('.shops__image-element').attr('data-src');
    } else {
      image = $(el).find('.shops__image-element').attr('src');
    }
    const product = {
      description: $(el).find('.ui-search-item__title').text() ?? '',
      price: price ?? '',
      image: image ?? '',
      url: $(el).find('.ui-search-link').attr('href') ?? ''
    };
    products.push(product);
  });

  return products;
};

export { mlScrapper };
