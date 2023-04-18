import type IProduct from './productInterface';

export interface ISorted {
  existingProducts: IProduct[];
  newProducts: IProduct[];
  deletedProducts: IProduct[];
}
