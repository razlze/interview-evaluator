'use client';

import { TextField, Box, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { UserDetailsContext } from '../../../providers/UserDetailsProvider';
import { useRouter } from 'next/navigation';
import ArrowForward from '@mui/icons-material/ChevronRightRounded';

export default function UserDetailsForm() {
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);
  const [name, setName] = useState(userDetails.name);
  const router = useRouter();

  const handleClick = () => {
    setUserDetails({ name: name });
    router.push('/job-info');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1.5rem',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <TextField
        label='Your Name'
        margin='normal'
        sx={{ margin: '0', width: '18.75rem' }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        variant='contained'
        disabled={name == ''}
        sx={{
          padding: '0.75rem 1.5rem',
          color: '#C8D5B9',
          boxShadow: '0px 4px 15.2px 0px rgba(0, 0, 0, 0.50)',
        }}
        endIcon={<ArrowForward />}
        onClick={handleClick}
      >
        Start Setup
      </Button>
    </Box>
  );
}
