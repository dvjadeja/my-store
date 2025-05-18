import { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  styled,
} from '@mui/material';

import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import type { Product } from '../../api/mockData';
import { useCartStore } from '../../store/cartStore';

const ProductCard = ({ product }: { product: Product }) => {
  const {
    addItem: addToCart,
    items: cartItems,
    removeItem: removeFromCart,
  } = useCartStore();
  const isItemAddedToCart = useMemo(
    () => cartItems.some((item) => item.product.id === product.id),
    [cartItems, product.id]
  );
  const itemQuantity = useMemo(
    () => cartItems.find((item) => item.product.id === product.id)?.quantity,
    [cartItems, product.id]
  );

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card data-testid="product-card">
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />

      <StyledCardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {product.name}
        </Typography>
        <Chip label={product.category} size="small" />
        <Typography variant="body2">{product.description}</Typography>

        {/* Price */}
        <Typography variant="h6">${product.price}</Typography>
      </StyledCardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {isItemAddedToCart ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleRemoveFromCart}
              size="small"
              color="primary"
              data-testid="remove-from-cart-icon-button"
            >
              <RemoveCircleRoundedIcon />
            </IconButton>
            <Typography>{itemQuantity}</Typography>
            <IconButton
              color="primary"
              onClick={handleAddToCart}
              size="small"
              data-testid="add-to-cart-icon-button"
            >
              <AddCircleRoundedIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{
              fontWeight: 'bold',
              width: '100%',
              textTransform: 'capitalize',
            }}
            data-testid="add-to-cart-button"
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const StyledCardContent = styled(CardContent)(() => ({
  paddingBottom: 0,
}));

export default ProductCard;
