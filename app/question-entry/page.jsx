import { Typography, Box } from '@mui/material';
import QuestionForm from './question-form';

export default async function Page() {
  return (
    <Box sx={{ marginTop: '3rem' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>
        Edit Questions
      </Typography>
      <QuestionForm></QuestionForm>
    </Box>
  );
}
