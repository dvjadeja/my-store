import { Box, styled, Typography } from '@mui/material';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = () => {
  return (
    <CheckoutContainer>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Checkout
        <Typography variant="body1" sx={{ fontSize: 14, color: '#676767' }}>
          Please fill in the details below to complete your order.
        </Typography>
      </Typography>

      <CheckoutForm />
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled(Box)(() => ({
  maxWidth: 786,
  margin: '0 auto',
}));

export default CheckoutPage;
