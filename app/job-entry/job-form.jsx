'use client';

import { Box, TextField, InputLabel, Button } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
import { useContext, useState } from 'react';
import { JobContext } from '../providers/JobProvider';

export default function JobForm() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [title, setJobTitle] = useState(jobInfo.title);
  return (
    <Box component='form'>
      <InputLabel htmlFor='job-title-input'>Job Title</InputLabel>
      <TextField
        required
        id='job-title-input'
        label='Required'
        fullWidth
        margin='normal'
      />

      <InputLabel htmlFor='job-type-input' sx={{ marginTop: '1rem' }}>
        Job Type
      </InputLabel>
      <MultipleSelectChip />

      <InputLabel htmlFor='job-title-input' sx={{ marginTop: '1rem' }}>
        Company
      </InputLabel>
      <TextField id='job-company-input' fullWidth margin='normal' />

      <InputLabel htmlFor='job-title-input' sx={{ marginTop: '1rem' }}>
        Job Requirements
      </InputLabel>
      <TextField
        id='job-requirements-input'
        fullWidth
        margin='normal'
        multiline
        minRows={5}
      />
      <Button variant='contained' sx={{ marginTop: '1rem' }} type='submit'>
        Next
      </Button>
    </Box>
  );
}
