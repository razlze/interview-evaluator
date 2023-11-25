import { Typography, Stack } from '@mui/material';
import Interview from './Interview';

export default async function Page() {
  return (
    <Stack alignItems='center' sx={{ marginTop: '3rem' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Interview
      </Typography>
      <Interview />
    </Stack>
  );
}
