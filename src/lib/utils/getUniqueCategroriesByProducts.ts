import type { Product } from '../../api/mockData';

export const getUniqueCategoriesByProduct = (
  products: Product[],
  key: keyof Product
): string[] => {
  if (products.length === 0) return [];

  const uniqueCategories = new Set(
    products.map((product) => product[key] as string)
  );

  return Array.from(uniqueCategories);
};

export const labelValueBuilder = (categories: string[]) => {
  if (categories.length === 0) return [];

  return categories.map((category) => ({
    label: category,
    value: category,
  }));
};
