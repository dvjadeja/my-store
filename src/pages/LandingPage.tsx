import { lazy } from 'react';
import { Box, Typography } from '@mui/material';

// Lazy load the StoreListing component
const StoreListing = lazy(() => import('../components/store/StoreListing'));

const LandingPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Available Stores
      </Typography>

      <StoreListing />
    </Box>
  );
};

export default LandingPage;
