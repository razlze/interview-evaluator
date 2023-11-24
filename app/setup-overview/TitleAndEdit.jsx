import { Box, Stack, Typography } from '@mui/material';
import { RiPencilFill } from 'react-icons/ri';
import React from 'react';

export default function TitleAndEdit({ title }) {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Typography variant='h3'>{title}</Typography>
        <Box
          display='flex'
          bgcolor='primary.main'
          justifyContent='center'
          alignItems='center'
          borderRadius='50%'
          width='1.7rem'
          height='1.7rem'
        >
          <RiPencilFill color='white' />
        </Box>
      </Stack>
      <Box
        height={4}
        mb={3}
        mt={1.2}
        width='3.5rem'
        bgcolor='primary.main'
        borderRadius={1}
      />
    </>
  );
}
