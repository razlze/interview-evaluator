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
      light: '#E6F3ED',
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
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 600,
      textAlign: 'left',
      color: '#354F52',
    },
    subtitle1: {
      fontSize: '0.7rem',
      fontWeight: 600,
      color: '#8FC0A9',
      textTransform: 'uppercase',
    },
    body1: {},
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
            '&.Mui-disabled': {
              color: '#354F524D',
              border: '2px solid #354F524D',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'none',
            border: '2px solid #354F52',
            borderRadius: '.8rem',
            padding: '.5rem 2.5rem',
            color: 'white',
            fontWeight: '700',
            fontSize: '1rem',
            backgroundColor: '#354F52',
            boxShadow: '0px 4px 6.599999904632568px 0px #00000040',
            '&:hover': {
              border: '2px solid #8FC0A9',
              backgroundColor: '#8FC0A9',
              color: '#354F52',
            },
            '&.Mui-disabled': {
              opacity: '30%',
              color: '#C8D5B9',
              border: '2px solid #354F52',
              backgroundColor: '#354F52',
            },
          },
        },
        {
          props: { variant: 'error' },
          style: {
            border: '2px solid #E65D5D',
            borderRadius: '.8rem',
            padding: '.5rem 1.5rem',
            color: '#E65D5D',
            fontWeight: '700',
            fontSize: '1rem',
            backgroundColor: '#E65D5D24',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#E65D5D',
              color: 'white',
            },
            '&.Mui-disabled': {
              backgroundColor: '#E65D5D1A',
              color: '#E65D5D4D',
              border: '2px solid #E65D5D4D',
            },
          },
        },
        {
          props: { variant: 'gradiant' },
          style: {
            borderRadius: '.5rem',
            padding: '.5rem 1.5rem',
            color: '#272D2D',
            fontWeight: '600',
            fontSize: '1rem',
            background:
              'linear-gradient(93deg, #C8D5B9 5.07%, #8FC0A9 155.78%)',
            boxShadow: '0px 4px 8.2px 0px rgba(200, 213, 185, 0.50)',
            textTransform: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8.2px 0px rgba(200, 213, 185, 0.90)',
              color: 'white',
            },
            '&.Mui-disabled': {
              opacity: 0.8,
              color: '#272D2D',
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
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: openSans.style.fontFamily,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#829E61',
          },
          color: '#5F6F4C',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
