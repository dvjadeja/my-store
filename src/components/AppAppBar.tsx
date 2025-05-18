import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  alpha,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  type Theme,
} from '@mui/material';
import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';

import { useStoresStore } from '../store/storesStore';
import { useCartStore } from '../store/cartStore';

import ThemeCustomizer from './ThemeCustomizer';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const RenderDynamicLogo = ({
  imgProps,
}: {
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
}) => {
  const { src = 'https://picsum.photos/42', alt = 'Logo' } = imgProps;
  return (
    <img
      src={src}
      alt={alt}
      style={{ borderRadius: '8px', width: 42, height: 42 }}
    />
  );
};

const AppAppBar = () => {
  // hooks
  const { selectedStore, setSelectedStore } = useStoresStore();
  const { totalItems } = useCartStore();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  // States
  const [customizerAnchorEl, setCustomizerAnchorEl] =
    useState<HTMLElement | null>(null);

  const handleOpenThemeCustomizerPoppover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setCustomizerAnchorEl(event.currentTarget);
  };

  const handleCloseThemeCustomizerPoppover = () => {
    setCustomizerAnchorEl(null);
  };

  const isThemeCustomizerOpen = Boolean(customizerAnchorEl);
  const customizerAnchorElId =
    customizerAnchorEl &&
    (customizerAnchorEl.id === 'theme-customizer-icon-button' ||
      customizerAnchorEl.id === 'theme-customizer-button')
      ? customizerAnchorEl.id
      : undefined;

  const resetSelectedStore = () => {
    setSelectedStore(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        mt: 1,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar>
          <Typography variant="h6">
            <Tooltip title="Go to Home">
              <Link
                component={ReactRouterLink}
                to="/"
                onClick={resetSelectedStore}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  textDecoration: 'none',
                }}
              >
                <RenderDynamicLogo
                  imgProps={{
                    src: selectedStore?.logo,
                    alt: selectedStore?.name,
                  }}
                />

                <Typography variant="h6" sx={{ ml: 1, textDecoration: 'none' }}>
                  {selectedStore ? selectedStore.name : 'My E-Commerce app'}
                </Typography>
              </Link>
            </Tooltip>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {selectedStore && (
              <>
                <>
                  {isMobile ? (
                    <IconButton
                      id="theme-customizer-icon-button"
                      onClick={handleOpenThemeCustomizerPoppover}
                      size="small"
                    >
                      <ContrastRoundedIcon />
                    </IconButton>
                  ) : (
                    <Button
                      id="theme-customizer-button"
                      variant="contained"
                      color="primary"
                      onClick={handleOpenThemeCustomizerPoppover}
                      size="small"
                      startIcon={<PaletteRoundedIcon />}
                    >
                      Theme Customizer
                    </Button>
                  )}
                </>

                <ThemeCustomizer
                  isOpen={isThemeCustomizerOpen}
                  onClose={handleCloseThemeCustomizerPoppover}
                  anchorEl={customizerAnchorEl}
                  anchorElId={customizerAnchorElId}
                />
              </>
            )}

            <Tooltip title="Go to Cart">
              <Link
                component={ReactRouterLink}
                to="/cart"
                onClick={resetSelectedStore}
              >
                <Tooltip title="Cart">
                  <Badge
                    badgeContent={totalItems || 0}
                    color="primary"
                    sx={{ fontSize: '1.5rem' }}
                  >
                    🛒
                  </Badge>
                </Tooltip>
              </Link>
            </Tooltip>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default AppAppBar;
