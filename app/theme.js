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
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'none',
            border: '2px solid #354F52',
            borderRadius: '.8rem',
            padding: '.5rem 2.5rem',
            color: '#354F52',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0px 4px 6.599999904632568px 0px #00000040',
            '&:hover': {
              border: '2px solid #354F52',
              color: 'white',
              backgroundColor: '#354F52',
            },
          },
        },
      ],
      styleOverrides: {
        iconSizeMedium: {
          '& > *:first-child': {
            fontSize: '1.5rem',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
