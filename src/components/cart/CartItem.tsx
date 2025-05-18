import { Box, IconButton, styled, Typography } from '@mui/material';

import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCartStore, type CartItem } from '../../store/cartStore';

interface CartItemProps {
  item: CartItem;
}
const CartItemComponent = ({ item }: CartItemProps) => {
  const { removeItem, addItem, removeProduct } =
    useCartStore();

  return (
    <CartItem key={item.product.id}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          src={item.product.image}
          alt={item.product.name}
          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
        />
        <Box>
          <Typography variant="subtitle1">{item.product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.product.price.toFixed(2)} each
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => removeItem(item.product)}
            size="small"
            color="primary"
          >
            <RemoveCircleRoundedIcon />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            onClick={() => addItem(item.product)}
            size="small"
            color="primary"
          >
            <AddCircleRoundedIcon />
          </IconButton>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ minWidth: 100, textAlign: 'right' }}
        >
          ${(item.product.price * item.quantity).toFixed(2)}
        </Typography>

        <IconButton
          onClick={() => removeProduct(item.product.id)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </CartItem>
  );
};

const CartItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

export default CartItemComponent;
