'use client';

import { Box, TextField, InputLabel, Button } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
import { useContext, useState } from 'react';
import { JobContext } from '../providers/JobProvider';
import { useRouter } from 'next/navigation';

export default function JobForm() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [title, setTitle] = useState(jobInfo.title);
  const [company, setCompany] = useState(jobInfo.company);
  const [reqs, setReqs] = useState(jobInfo.reqs);
  const [type, setType] = useState(jobInfo.type);
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    setJobInfo({
      title: title,
      type: type,
      company: company,
      reqs: reqs,
    });
    router.push('/question-entry');
  };

  return (
    <Box component='form' onSubmit={handleNext}>
      <InputLabel htmlFor='job-title-input'>Job Title</InputLabel>
      <TextField
        required
        id='job-title-input'
        label='Required'
        fullWidth
        margin='normal'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <InputLabel htmlFor='job-type-input' sx={{ marginTop: '1rem' }}>
        Job Type
      </InputLabel>
      <MultipleSelectChip jobType={type} setJobType={setType} />

      <InputLabel htmlFor='job-title-input' sx={{ marginTop: '1rem' }}>
        Company
      </InputLabel>
      <TextField
        id='job-company-input'
        fullWidth
        margin='normal'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <InputLabel htmlFor='job-title-input' sx={{ marginTop: '1rem' }}>
        Job Requirements
      </InputLabel>
      <TextField
        id='job-requirements-input'
        fullWidth
        margin='normal'
        multiline
        minRows={5}
        value={reqs}
        onChange={(e) => setReqs(e.target.value)}
      />
      <Button variant='contained' sx={{ marginTop: '1rem' }} type='submit'>
        Next
      </Button>
    </Box>
  );
}
