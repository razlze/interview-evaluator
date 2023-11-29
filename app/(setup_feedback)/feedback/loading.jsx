import { Box, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
    >
      <div className='container'>
        <div className='half'></div>
        <div className='half'></div>
      </div>
      <Typography color='primary.dark' fontSize='1.2rem' mt={4}>
        Evaluating your interview answers...
      </Typography>
    </Box>
  );
}
