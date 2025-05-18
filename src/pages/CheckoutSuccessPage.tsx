import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Button, Paper, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: 500,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
}));

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const totalAmount = searchParams.get('total');

  if (!totalAmount) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <SuccessContainer>
        <SuccessIcon />
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Thank you for your purchase
        </Typography>
        {totalAmount && (
          <Typography
            variant="h5"
            color="success.main"
            sx={{ fontWeight: 'bold' }}
          >
            Total Amount: ${totalAmount}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </SuccessContainer>
    </Container>
  );
};

export default CheckoutSuccessPage;
