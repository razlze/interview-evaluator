import { Typography, Box } from '@mui/material';
import JobForm from './job-form';

export default async function Page() {
  return (
    <Box sx={{marginTop: "3rem"}}>
      <Typography variant="h3" sx={{textAlign: "center"}}>Job Details</Typography>
      <JobForm></JobForm>
    </Box>
  )
}
