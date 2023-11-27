import { Container } from '@mui/material';

export default function RootLayout({ children }) {
  return <Container maxWidth='lg'>{children}</Container>;
}
