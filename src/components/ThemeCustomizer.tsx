import { useCallback, useState, useEffect, useMemo } from 'react';
import { Box, Popover, styled, Typography } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import debounce from 'lodash/debounce';

import { useStoresStore } from '../store/storesStore';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  anchorElId: string | undefined;
}

const ThemeCustomizer = ({
  isOpen: isThemeCustomizerOpen,
  anchorEl,
  anchorElId,
  onClose,
}: ThemeCustomizerProps) => {
  const { selectedStore, updateStoreTheme } = useStoresStore();
  const [localColor, setLocalColor] = useState(
    selectedStore?.theme || '#000000'
  );

  // Update local color when selected store changes
  useEffect(() => {
    if (selectedStore) {
      setLocalColor(selectedStore.theme);
    }
  }, [selectedStore]);

  // Debounced color update of the selected store
  const debouncedColorUpdate = useCallback(
    (color: string) => {
      if (selectedStore) {
        updateStoreTheme(selectedStore.id, color);
      }
    },
    [selectedStore, updateStoreTheme]
  );

  // Debounce the color update of the selected store
  const debouncedUpdate = useMemo(
    () => debounce(debouncedColorUpdate, 150),
    [debouncedColorUpdate]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setLocalColor(color);
      debouncedUpdate(color);
    },
    [debouncedUpdate]
  );

  if (!selectedStore) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          Please select a store to customize its theme
        </Typography>
      </Box>
    );
  }

  return (
    <StyledPopover
      open={isThemeCustomizerOpen}
      anchorEl={anchorEl}
      id={anchorElId}
      disableScrollLock={true}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" gutterBottom>
          Customize{' '}
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: 'bold' }}
          >
            {selectedStore.name}
          </Typography>{' '}
          theme
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <HexColorPicker color={localColor} onChange={handleColorChange} />
          <Typography variant="body2">Current color: {localColor}</Typography>
        </Box>
      </Box>
    </StyledPopover>
  );
};

const StyledPopover = styled(Popover)(() => ({
  '& .MuiPaper-root': {
    borderRadius: 4,
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.4)',
  },
}));

export default ThemeCustomizer;
