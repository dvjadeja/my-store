import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema } from '../../lib/constants/schema';
import { checkoutFormDefaultValues } from '../../lib/constants/schema';
import type { CheckoutFormSchemaType } from '../../lib/constants/schema';
import CustomInput from '../common/hook-form/CustomInput';
import { Box, Button, Grid, styled } from '@mui/material';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';

const CheckoutForm = () => {
  // hooks
  const { totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<CheckoutFormSchemaType>({
    defaultValues: checkoutFormDefaultValues,
    resolver: zodResolver(checkoutFormSchema),
  });

  // States
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const onSubmit = (data: CheckoutFormSchemaType) => {
    setIsPaymentProcessing(true);
    console.log(data);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      clearCart();
      navigate(`/checkout/success?total=${totalPrice.toFixed(2)}`);
    }, 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="name"
            label="Name"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="email"
            label="Email"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="phone"
            label="Phone"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="city"
            label="City"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomInput
            control={control}
            name="address"
            label="Address"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="state"
            label="State"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomInput
            control={control}
            name="zipCode"
            label="Zip Code"
            inputProps={{ disabled: isPaymentProcessing }}
          />
        </Grid>
      </Grid>

      <ButtonContainer>
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          loading={isPaymentProcessing}
          disabled={isPaymentProcessing}
        >
          Place Order
        </StyledButton>

        <StyledButton
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleBack}
          disabled={isPaymentProcessing}
        >
          Back
        </StyledButton>
      </ButtonContainer>
    </form>
  );
};

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '24px',
});

const StyledButton = styled(Button)({
  borderRadius: '8px',
  marginRight: '4px',
});

export default CheckoutForm;
