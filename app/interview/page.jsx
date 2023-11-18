import { Typography, Box, Stack } from '@mui/material';
import WebCamera from './webcam';
import AudioRecording from './AudioRecorder';

export default async function Page() {
  return (
    // <Box sx={{ marginTop: '3rem', display: 'flex', direction: 'column' }}>
    <Stack alignItems='center' sx={{ marginTop: '3rem' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Interview
      </Typography>
      <WebCamera />
      <AudioRecording />
    </Stack>
    // </Box>
  );
}
