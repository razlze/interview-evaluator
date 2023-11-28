'use client';

import { useEffect, useContext, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { FeedbackContext } from '../../providers/FeedbackProvider';

export default function Feedback() {
  const [feedback, setFeedback] = useContext(FeedbackContext);
  console.log(feedback);
  return (
    <>
      <Typography variant='h4'>Strengths</Typography>
      {Object.entries(feedback['strengths']).map(([key, value]) => {
        return (
          <Box key={key}>
            <Typography variant='h3'>{key}</Typography>
            <Typography variant='body1'>{value}</Typography>
          </Box>
        );
      })}
      <Typography variant='h4'>Weaknesses</Typography>
      {Object.entries(feedback['improvements']).map(([key, value]) => {
        return (
          <Box key={key}>
            <Typography variant='h3'>{key}</Typography>
            <Typography variant='body1'>{value}</Typography>
          </Box>
        );
      })}
    </>
  );
}
