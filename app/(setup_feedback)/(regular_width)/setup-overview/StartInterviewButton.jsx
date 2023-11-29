'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import { useRouter } from 'next/navigation';

export default function StartInterviewButton() {
  const router = useRouter();
  return (
    <Button
      variant='contained'
      onClick={() => router.push('/interview')}
      endIcon={
        <Box display='flex' alignItems='center' ml={0.5}>
          <PlayCircleFilledWhiteRoundedIcon />
        </Box>
      }
    >
      Start Interview
    </Button>
  );
}
