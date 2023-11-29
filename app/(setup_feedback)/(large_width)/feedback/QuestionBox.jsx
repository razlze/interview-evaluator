import { Button, Typography, ButtonBase } from '@mui/material';

import React from 'react';

export default function QuestionBox({ index, question, active, setActive }) {
  return (
    <Button
      sx={{
        padding: '1.5rem',
        minHeight: '8rem',
        justifyContent: 'start',
        textAlign: 'left',
        alignItems: 'start',
        boxShadow: '0px 4px 19.2px 0px rgba(0, 0, 0, 0.25)',
        borderWidth: '5px',
        '&:hover': {
          borderWidth: '5px',
        },
      }}
      variant='contained'
      onClick={() => setActive(index)}
      className={active == index ? 'active' : null}
    >
      <Typography sx={{ color: 'white', fontWeight: 700 }}>
        {question}
      </Typography>
    </Button>
  );
}
