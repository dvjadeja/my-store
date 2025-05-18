import { createTheme } from '@mui/material';

const createCustomTheme = (themeColor: string) => {
  return createTheme({
    // update the text color based on the theme color
    palette: {
      primary: {
        main: themeColor,
      },
    },
    typography: {
      allVariants: {
        color: themeColor,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: 'primary',
        },
      },
    },
  });
};

export default createCustomTheme;
