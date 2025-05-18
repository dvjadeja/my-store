import { Box, Container, CssBaseline } from '@mui/material';
import AppAppBar from '../AppAppBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
