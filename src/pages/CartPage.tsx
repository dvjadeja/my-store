import { lazy, Suspense, useMemo } from 'react';
import { Box, styled, Typography, Button, Skeleton } from '@mui/material';

import { stores } from '../api/mockData';
import { useCartStore, type CartItem } from '../store/cartStore';
import { Link } from 'react-router-dom';

const CartItemsListing = lazy(
  () => import('../components/cart/CartItemsListing')
);

const SkeletonCartItemsListing = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} variant="rectangular" height={100} sx={{ mb: 2 }} />
  ));
};

interface ItemByStore {
  store: (typeof stores)[0];
  items: CartItem[];
  subtotal: number;
}

export interface ItemsByStoreType {
  [storeId: string]: ItemByStore;
}

const CartPage = () => {
  const { items, totalPrice } = useCartStore();

  // Group items by store
  const itemsByStore = useMemo(() => {
    const grouped = stores.reduce((acc, store) => {
      const storeItems = items.filter(
        (item) => item.product.storeId === store.id
      );
      if (storeItems.length > 0) {
        acc[store.id] = {
          store,
          items: storeItems,
          subtotal: storeItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
        };
      }
      return acc;
    }, {} as ItemsByStoreType);
    return grouped;
  }, [items]);

  if (items.length === 0) {
    return (
      <CartPageWrapper>
        <Typography variant="h5" textAlign="center">
          Your cart is empty
        </Typography>
      </CartPageWrapper>
    );
  }

  return (
    <CartPageWrapper>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Suspense fallback={<SkeletonCartItemsListing />}>
        <CartItemsListing itemsByStore={itemsByStore} />
      </Suspense>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Typography variant="h5">
          Total:{' '}
          <Typography
            component="span"
            variant="h5"
            style={{ fontWeight: 'bold' }}
          >
            ${totalPrice.toFixed(2)}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/checkout"
        >
          Checkout
        </Button>
      </Box>
    </CartPageWrapper>
  );
};

const CartPageWrapper = styled(Box)({
  mt: 2,
  p: 3,
});

export default CartPage;
