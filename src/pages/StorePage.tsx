import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useStoresStore } from '../store/storesStore';
import { type Product } from '../api/mockData';
import DynamicBreadcrumbs from '../components/common/DynamicBreadcrimbs';
import { getStoreProducts } from '../lib/utils/getProductsByStore';
import {
  getUniqueCategoriesByProduct,
  labelValueBuilder,
} from '../lib/utils/getUniqueCategroriesByProducts';
import { findMaxFromKey, findMinFromKey } from '../lib/utils/findMaxFromKey';

import CircularProgressLoader from '../components/common/CircularProgressbarLoader';
import FilterDrawer from '../components/store/FilterDrawer';
import { Autocomplete, TextField } from '@mui/material';

// Lazy load the ProductListing component
const ProductListing = lazy(
  () => import('../components/product/ProductListing')
);

const StorePage = () => {
  // Hooks
  const { storeId } = useParams();
  const { stores: allStores, setSelectedStore } = useStoresStore();
  const selectedStore = allStores.find((store) => {
    if (!storeId) return false;

    return store.id === storeId;
  });

  // States
  const [products, setProducts] = useState<Product[]>([]);
  console.log('🚀 ~ StorePage ~ products:', products);
  const [uniqueCategories, setUniqueCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [category, setCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Handle Store Selection for updating the selectedStore
  const handleStoreSelection = useCallback(() => {
    if (!storeId) return;
    const selectedStore = allStores.find((store) => store.id === storeId);
    if (selectedStore) {
      setSelectedStore(selectedStore.id);
    }
  }, [storeId, allStores, setSelectedStore]);

  // Handler for setting products based on storeId
  const handleSettingProducts = useCallback(() => {
    // if storeId is not found, return
    if (!storeId) return;

    // get products by storeId
    const storeProducts = getStoreProducts(storeId);

    // setting products
    setProducts(storeProducts);

    // get unique categories by product
    setUniqueCategories(
      labelValueBuilder(getUniqueCategoriesByProduct(storeProducts, 'category'))
    );

    // Find Min and Max Price
    const minPrice = findMinFromKey(storeProducts, 'price');
    const maxPrice = findMaxFromKey(storeProducts, 'price');

    // set price range
    setPriceRange([minPrice, maxPrice]);
  }, [setProducts, storeId]);

  // TODO: This can be managed through API as well
  // UseEffect to handle store selection change when storeId changes
  useEffect(() => {
    handleStoreSelection();
    handleSettingProducts();
  }, [storeId, handleStoreSelection, handleSettingProducts]);

  const handleSaveFilter = useCallback(
    (payload: { category: string | null; priceRange: number[] }) => {
      const {
        category,
        priceRange: [minPrice, maxPrice],
      } = payload;

      if (!storeId) return;

      // filter products by category
      let tempProducts = sortOrder ? products : getStoreProducts(storeId);

      if (category) {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (minPrice && maxPrice) {
        tempProducts = tempProducts.filter((product) => {
          return product.price >= minPrice && product.price <= maxPrice;
        });
      }

      // setting products
      setProducts(tempProducts);
    },
    [storeId, sortOrder, products]
  );

  const handleClearAllFilters = useCallback(() => {
    handleStoreSelection();
    handleSettingProducts();
    setCategory(null);
    setSortOrder(null);
  }, [handleStoreSelection, handleSettingProducts]);

  if (!storeId || !selectedStore) {
    return (
      <Box>
        <Typography variant="h6">Store not found</Typography>
      </Box>
    );
  }

  const handleSorting = (
    onChangeValue: {
      label: string;
      value: string;
    } | null
  ) => {
    if (onChangeValue === null) {
      setSortOrder(null);
      let tempProducts = sortOrder ? products : getStoreProducts(storeId);

      if (category) {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (priceRange[0] && priceRange[1]) {
        const [minPrice, maxPrice] = priceRange;
        tempProducts = tempProducts.filter((product) => {
          return product.price >= minPrice && product.price <= maxPrice;
        });
      }

      // setting products
      setProducts(tempProducts);
    }

    if (!onChangeValue) return;

    const { value } = onChangeValue;
    setSortOrder(onChangeValue);

    const sortedProducts: Product[] = [...products].sort((a, b) => {
      if (value === 'asc') {
        return a.price - b.price;
      } else if (value === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });

    setProducts(sortedProducts);
  };

  return (
    <StorePageWrapper>
      {selectedStore ? (
        <>
          <StorePageHeader>
            {/* Breadcrumbs - Home / Store Name */}
            <DynamicBreadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: selectedStore?.name || '', path: `/store/${storeId}` },
              ]}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Autocomplete
                size="small"
                disablePortal
                options={[
                  {
                    label: 'Asc',
                    value: 'asc',
                  },
                  {
                    label: 'Desc',
                    value: 'desc',
                  },
                ]}
                sx={{ width: '200px' }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by Category" />
                )}
                value={sortOrder}
                onChange={(_, value) => handleSorting(value)}
              />

              <FilterDrawer
                minPrice={findMinFromKey(getStoreProducts(storeId), 'price')}
                maxPrice={findMaxFromKey(getStoreProducts(storeId), 'price')}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category || null}
                setCategory={(value) => setCategory(value)}
                sortOrder={sortOrder}
                uniqueCategories={uniqueCategories}
                handleClearAllFilters={handleClearAllFilters}
                handleSaveFilter={handleSaveFilter}
              />
            </Box>
          </StorePageHeader>

          {/* List down products */}
          <Suspense fallback={<CircularProgressLoader />}>
            <ProductListing
              products={products}
              sortOrder={sortOrder?.value || null}
            />
          </Suspense>
        </>
      ) : (
        <Box>
          <Typography variant="h6">Store not found</Typography>
        </Box>
      )}
    </StorePageWrapper>
  );
};

const StorePageWrapper = styled(Box)({
  mt: 2,
});

const StorePageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: `${theme.spacing(2)} !important`,
  marginBottom: `${theme.spacing(2)} !important`,
}));

export default StorePage;
