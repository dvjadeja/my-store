import { lazy, Suspense, useEffect, useState } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import type { Product } from '../../api/mockData';
import CircularProgressLoader from '../common/CircularProgressbarLoader';

const ProductCard = lazy(() => import('./ProductCard'));
const Pagination = lazy(() => import('../common/Pagination'));

interface ProductListingProps {
  products: Product[];
}

const SkeletonLoaderForProductsCard = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Skeleton variant="rectangular" height={140} />
        </Grid>
      ))}
    </>
  );
};

const PRODUCTS_PER_PAGE = 6;

const ProductListing = ({ products }: ProductListingProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  return (
    <>
      <Grid container spacing={2}>
        <Suspense fallback={<SkeletonLoaderForProductsCard />}>
          {paginatedProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Suspense>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Suspense fallback={<CircularProgressLoader />}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
          />
        </Suspense>
      </Box>
    </>
  );
};

export default ProductListing;
