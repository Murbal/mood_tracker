import { ThemeProvider } from '@mui/material';
import IndexPage from './pages/Index';
import { appTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;
