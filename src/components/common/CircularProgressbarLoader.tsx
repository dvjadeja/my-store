import { CircularProgress } from '@mui/material';

import { Box } from '@mui/material';

const CircularProgressLoader = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress size={20} />
    </Box>
  );
};

export default CircularProgressLoader;
