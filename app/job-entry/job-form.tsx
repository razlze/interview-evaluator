'use client'

import { Box, TextField, InputLabel, Button  } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
export default function JobForm() {

  return (
    <Box
      component="form"
    >
      <InputLabel htmlFor="job-title-input">Job Title</InputLabel>
      <TextField
        required
        id="job-title-input"
        label="Required"
        fullWidth
        margin="normal"
      />
      
      <InputLabel htmlFor="job-type-input" sx={{marginTop: "1rem"}}>Job Type</InputLabel>
      <MultipleSelectChip/>

      <InputLabel htmlFor="job-title-input" sx={{marginTop: "1rem"}}>Company</InputLabel>
      <TextField
        id="job-company-input"
        fullWidth
        margin="normal"
      />

      <InputLabel htmlFor="job-title-input" sx={{marginTop: "1rem"}}>Job Requirements</InputLabel>
      <TextField
        id="job-requirements-input"
        fullWidth
        margin="normal"
        multiline
        minRows={5}
      />
      <Button variant="contained" sx={{marginTop: "1rem"}} type="submit">Next</Button>
    </Box>
  )
}