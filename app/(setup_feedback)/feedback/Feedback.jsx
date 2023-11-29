'use client';

import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { FeedbackContext } from '../../providers/FeedbackProvider';

export default function Feedback() {
  const [feedback] = useContext(FeedbackContext);
  return (
    <>
      {Object.entries(feedback).map(([index, comments]) => {
        return (
          <Box key={index}>
            {index == 'overall' ? (
              <>
                <Typography variant='h1'>Feedback {index}</Typography>
                <Typography variant='body1'>{comments}</Typography>
              </>
            ) : (
              <>
                <Typography variant='h1'>Question {index}</Typography>
                <Typography variant='h4'>Strengths</Typography>
                {Object.entries(comments['strengths']).map(([key, value]) => {
                  return (
                    <Box key={key}>
                      <Typography variant='h3'>{key}</Typography>
                      <Typography variant='body1'>{value}</Typography>
                    </Box>
                  );
                })}
                <Typography variant='h4'>Weaknesses</Typography>
                {Object.entries(comments['improvements']).map(
                  ([key, value]) => {
                    return (
                      <Box key={key}>
                        <Typography variant='h3'>{key}</Typography>
                        <Typography variant='body1'>{value}</Typography>
                      </Box>
                    );
                  }
                )}
              </>
            )}
          </Box>
        );
      })}
    </>
  );
}
