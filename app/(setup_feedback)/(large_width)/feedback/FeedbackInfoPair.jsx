'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

export default function FeedbackInfoPair({ fieldName, feedbackContent }) {
  return (
    <Box mb={1}>
      <Typography variant='subtitle1'>{fieldName}</Typography>
      <Typography variant='body1' whiteSpace='pre-wrap'>
        {feedbackContent}
      </Typography>
    </Box>
  );
}
