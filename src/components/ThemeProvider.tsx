import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import createCustomTheme from '../theme';
import { useStoresStore } from '../store/storesStore';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedStore } = useStoresStore();
  // console.log("🚀 ~ ThemeProvider ~ selectedStore:", selectedStore)
  const theme = createCustomTheme(selectedStore?.theme || '#000000');

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
