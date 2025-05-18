import { lazy, Suspense, useEffect } from 'react';
import { Grid, Skeleton } from '@mui/material';

import { useStoresStore } from '../../store/storesStore';

// Lazy load the StoreCard component
const StoreCard = lazy(() => import('./StoreCard'));

// Skeleton loader for the StoreListing component
const StoreCardSkeletonLoader = () => {
  return Array.from({ length: 12 }).map((_, index) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
      <Skeleton variant="rectangular" height={140} />
    </Grid>
  ));
};

const StoreListing = () => {
  const { stores, setSelectedStore } = useStoresStore();

  useEffect(() => {
    setSelectedStore(null);
  }, [setSelectedStore]);

  return (
    <Grid container spacing={2}>
      <Suspense fallback={<StoreCardSkeletonLoader />}>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </Suspense>
    </Grid>
  );
};

export default StoreListing;
