import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationProps {
  count: number; // Total number of pages
  page: number; // Current page (1-indexed)
  onChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePageChange =
    (newPage: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (newPage >= 1 && newPage <= count) {
        onChange(event, newPage);
      }
    };

  // Basic styles derived from Figma CSS Layer
  const buttonBaseStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '8px', sm: '12px' }, // Responsive padding
    gap: { xs: '8px', sm: '12px' }, // Responsive gap
    width: { xs: '40px', sm: '48px' }, // Responsive width
    height: { xs: '40px', sm: '48px' }, // Responsive height
    borderRadius: '999px', // or '50%'
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
  };

  const inactiveButtonStyle = {
    ...buttonBaseStyle,
    background: '#FFFFFF',
    border: '1.2px solid #ECECEC',
    color: '#141414', // Primary/P1 for inactive number text
    '&:hover': {
      background: '#f5f5f5', // Slight hover effect
    },
  };

  const activeButtonStyle = {
    ...buttonBaseStyle,
    background: '#141414', // Primary/P1 for active background
    border: '1.2px solid #141414',
    color: '#FFFFFF', // Basic/B3 for active number text
  };

  const arrowButtonStyle = {
    ...inactiveButtonStyle,
    // Arrow specific styles might be slightly different if needed
  };

  const disabledArrowStyle = {
    ...arrowButtonStyle,
    borderColor: '#ECECEC',
    color: '#CCCCCC', // Basic/B4 for disabled arrow icon color
    cursor: 'not-allowed',
    '&:hover': {
      background: '#FFFFFF', // No hover effect when disabled
    },
  };

  const iconStyle = {
    width: { xs: '14px', sm: '16px' }, // Responsive width
    height: { xs: '14px', sm: '16px' }, // Responsive height
    fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
  };

  const activeIconStyle = {
    ...iconStyle,
    color: '#141414', // Primary/P1 for enabled arrow
  };

  const inactiveIconStyle = {
    ...iconStyle,
    color: '#CCCCCC', // Basic/B4 for disabled arrow
  };

  const numberStyle = {
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 500,
    fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
    lineHeight: { xs: '20px', sm: '24px' }, // Responsive line height
    textAlign: 'center',
    width: { xs: '20px', sm: '24px' }, // Responsive width
    height: { xs: '20px', sm: '24px' }, // Responsive height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // --- Updated Pagination Logic ---
  const maxPageButtons = isMobile ? 3 : 5; // Dynamically set maxPageButtons

  const getPageNumbers = () => {
    if (count <= maxPageButtons) {
      // If total pages are less than or equal to max, show all
      return Array.from({ length: count }, (_, i) => i + 1);
    }

    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(1, page - halfMaxButtons);
    let endPage = Math.min(count, page + halfMaxButtons);

    // Adjust if we are near the beginning
    if (page - halfMaxButtons < 1) {
      endPage = maxPageButtons;
    }

    // Adjust if we are near the end
    if (page + halfMaxButtons > count) {
      startPage = count - maxPageButtons + 1;
    }

    // Adjust range length if odd number of max buttons and near edges
    if (maxPageButtons % 2 !== 0) {
      if (page <= halfMaxButtons + 1) {
        endPage = maxPageButtons;
      }
      if (page >= count - halfMaxButtons) {
        startPage = count - maxPageButtons + 1;
      }
    }

    // Ensure the range doesn't exceed maxPageButtons
    // This logic might need refinement based on desired behavior with ellipsis
    // For now, it ensures we don't show more than maxPageButtons
    if (endPage - startPage + 1 > maxPageButtons) {
      if (page > count - Math.ceil(maxPageButtons / 2)) {
        startPage = count - maxPageButtons + 1;
      } else {
        endPage = startPage + maxPageButtons - 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();
  // --- End Updated Pagination Logic ---

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        gap: { xs: '4px', sm: '8px' }, // Responsive gap
        width: 'fit-content', // Adjust width based on content
        height: { xs: '40px', sm: '48px' }, // Responsive height
        mt: 4, // Add some margin top for spacing
        mb: 4,
      }}
    >
      {/* Previous Button */}
      <IconButton
        sx={page === 1 ? disabledArrowStyle : arrowButtonStyle}
        onClick={handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="previous page"
      >
        <ArrowBackIosNewIcon
          sx={page === 1 ? inactiveIconStyle : activeIconStyle}
        />
      </IconButton>

      {/* Page Number Buttons */}
      {pageNumbers.map((num) => (
        <Box
          key={num}
          sx={page === num ? activeButtonStyle : inactiveButtonStyle}
          onClick={handlePageChange(num)}
          component="button" // Make it behave like a button for accessibility/semantics
          aria-current={page === num ? 'page' : undefined}
          aria-label={`page ${num}`}
          // Remove default button styles AND the conflicting inline style
          style={{
            border: 'none',
            padding: 0,
            margin: 0,
            // Reapply background based on sx prop (implicitly handles active/inactive)
            // Ensure cursor is pointer
            cursor: 'pointer',
          }}
          data-testid={`pagination-button-${num}`}
        >
          <Typography
            sx={{ ...numberStyle, color: page === num ? '#FFFFFF' : '#141414' }}
          >
            {num}
          </Typography>
        </Box>
      ))}

      {/* Next Button */}
      <IconButton
        sx={page === count ? disabledArrowStyle : arrowButtonStyle}
        onClick={handlePageChange(page + 1)}
        disabled={page === count}
        aria-label="next page"
      >
        <ArrowForwardIosIcon
          sx={page === count ? inactiveIconStyle : activeIconStyle}
        />
      </IconButton>
    </Box>
  );
};

export default Pagination;
