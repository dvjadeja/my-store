import { useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import isEqual from 'lodash/isEqual';

interface FilterDrawerProps {
  minPrice: number;
  maxPrice: number;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  uniqueCategories: { label: string; value: string }[];
  handleClearAllFilters: () => void;
  handleSaveFilter: (payload: {
    category: string | null;
    priceRange: number[];
  }) => void;
}

const FilterDrawer = ({
  minPrice,
  maxPrice,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  uniqueCategories,
  handleClearAllFilters,
  handleSaveFilter,
}: FilterDrawerProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearAll = () => {
    handleClearAllFilters();
    handleClose();
  };

  const handleApply = () => {
    const payload = {
      category: category,
      priceRange: priceRange,
    };

    handleSaveFilter(payload);
    handleClose();
  };

  const isFilterApplied = useMemo(() => {
    // Compare old price range with new price range using lodash
    const isPriceRangeClearable = isEqual(priceRange, [minPrice, maxPrice]);

    return category || !isPriceRangeClearable;
  }, [category, priceRange, minPrice, maxPrice]);

  return (
    <Box>
      <Button
        startIcon={<FilterListIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        Filter
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        disableScrollLock
        keepMounted
      >
        <StyledFilterWrapper>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filter
          </Typography>
          <Divider sx={{ my: 2, mb: 4 }} />

          <StyledFilterItemWrapper>
            <Typography variant="body1">Price Range</Typography>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={(_, value) => setPriceRange(value as number[])}
              valueLabelDisplay="auto"
              size="small"
              max={maxPrice}
              min={0}
            />
          </StyledFilterItemWrapper>

          <StyledFilterItemWrapper>
            <Typography variant="body1">Category</Typography>
            <Autocomplete
              size="small"
              disablePortal
              options={uniqueCategories}
              value={
                category
                  ? uniqueCategories.find((cat) => cat.value === category)
                  : null
              }
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Category" />
              )}
              onChange={(_, value) => value && setCategory(value.value)}
            />
          </StyledFilterItemWrapper>
        </StyledFilterWrapper>

        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          {isFilterApplied && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApply}
          >
            Apply
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

const StyledFilterWrapper = styled(Box)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(2),
}));

const StyledFilterItemWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export default FilterDrawer;
