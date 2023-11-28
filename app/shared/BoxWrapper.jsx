import { Typography, Box, Paper } from '@mui/material';
import Image from 'next/image';

export default function BoxWrapper({ title, imageSrc, children, style }) {
  return (
    <Paper
      sx={{
        p: 9,
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '1rem',
        mt: '2rem',
        ...style,
      }}
      elevation={8}
    >
      <Box
        position='absolute'
        display='flex'
        justifyContent='center'
        alignItems='center'
        borderRadius='50%'
        height='6rem'
        width='6rem'
        bgcolor='primary.main'
        top='-3rem'
      >
        <Image
          src={imageSrc}
          width={60}
          height={60}
          alt='Picture of the author'
        />
      </Box>
      <Typography variant='h1'>{title}</Typography>
      <Box
        height={5}
        mb={4}
        mt={2}
        width='6rem'
        bgcolor='primary.main'
        borderRadius={1}
      />
      {children}
    </Paper>
  );
}
