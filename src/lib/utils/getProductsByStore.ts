import { products, type Product } from '../../api/mockData';

export const getStoreProducts = (storeId: string): Product[] => {
  // if storeId is not found, return empty array
  if (!storeId) return [];

  // filter products by storeId
  const storeProducts = products.filter(
    (product) => product.storeId === storeId
  );

  if (storeProducts.length === 0) return [];

  return storeProducts;
};
