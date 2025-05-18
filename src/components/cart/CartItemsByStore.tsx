import { Box, Divider, styled, Typography } from '@mui/material';
import CartItemComponent from './CartItem';
import type { Store } from '../../api/mockData';
import type { CartItem } from '../../store/cartStore';

interface CartItemsByStoreProps {
  store: Store;
  storeItems: CartItem[];
  subtotal: number;
}

const CartItemsByStore = ({
  store,
  storeItems,
  subtotal,
}: CartItemsByStoreProps) => {
  return (
    <StoreCartSection>
      <Typography variant="h5" gutterBottom>
        {store.name}
      </Typography>

      {storeItems.map((item) => (
        <CartItemComponent item={item} key={item.product.id} />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography variant="h6">
          Store Subtotal: ${subtotal.toFixed(2)}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />
    </StoreCartSection>
  );
};

const StoreCartSection = styled(Box)({
  mb: 4,
});

export default CartItemsByStore;
