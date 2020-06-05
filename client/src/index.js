import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
// import App from './App';
import NavbarMenu from './components/NavbarMenu';

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

/*
 * Currently only renders the top right menu button for user login.
 */
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <NavbarMenu />
  </ThemeProvider>
, document.getElementById('LoginMenu'));


// ReactDOM.render(<App />, document.getElementById('root'));
