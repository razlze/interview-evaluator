'use client';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

let theme = createTheme({
  palette: {
    primary: {
      light: '#C8D5B9',
      main: '#8FC0A9',
      dark: '#354F52',
    },
    secondary: {
      main: '#FAF3DD',
    },
    text: {
      primary: '#272d2d',
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      textAlign: 'center',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
