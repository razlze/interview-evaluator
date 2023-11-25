import { Box, Container } from '@mui/material';

export default function InterviewLayout({ children }) {
  return (
    <Box
      sx={{
        background: 'white',
      }}
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '65rem',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
