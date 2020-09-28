import React from 'react';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import Navbar from './components/Navbar';

let theme = createMuiTheme({
  palette: {
    primary: { main: '#393e46' },
    secondary: { main: '#00adb5' },
    third: { main: '#eeeeee' }
  },
  typography: {
    'fontFamily': `'Montserrat', sans-serif`
  },
});
theme = responsiveFontSizes(theme);


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>

  );
}
