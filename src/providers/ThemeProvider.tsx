import React, { FC } from 'react';
import { createMuiTheme, CssBaseline, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@material-ui/core';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: '#5066ff',
      main: '#2f54eb',
      dark: '#20399e',
    },
    text: {
      primary: '#232d38',
      secondary: '#f5f6f7',
    },
    background: {
      default: '#f5f6f7',
    },
  },
};

const theme = createMuiTheme(themeOptions);

const ThemeProvider: FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export { ThemeProvider };
