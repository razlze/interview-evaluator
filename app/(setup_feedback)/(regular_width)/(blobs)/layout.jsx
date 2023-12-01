import { Container, Box } from '@mui/material';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#C8D5B9',
        }}
      />
      <Image
        src={'blobs.svg'}
        width={40}
        alt='blobs'
        height={40}
        style={{
          position: 'absolute',
          height: '170%',
          width: '170%',
          left: '-35%',
          top: '-35%',
        }}
      />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '65rem',
          position: 'relative',
        }}
      >
        {children}
      </Container>
    </>
  );
}
