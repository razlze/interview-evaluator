'use client';

import { Grid, TextField } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
import { useContext, useState } from 'react';
import { JobContext } from '../providers/JobProvider';
import { useRouter } from 'next/navigation';

export default function JobForm() {
  const [jobInfo] = useContext(JobContext);
  const [title, setTitle] = useState(jobInfo.title);
  const [company, setCompany] = useState(jobInfo.company);
  const [reqs, setReqs] = useState(jobInfo.reqs);
  const [type, setType] = useState(jobInfo.type);
  const router = useRouter();

  return (
    <Grid container spacing={5} flexDirection='row'>
      <Grid item container flexDirection='column' xs={6}>
        <TextField
          required
          label='Job Title'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MultipleSelectChip jobType={type} setJobType={setType} />
        <TextField
          fullWidth
          margin='normal'
          label='Company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Grid>
      <Grid item container xs={6} height='100%'>
        <TextField
          fullWidth
          label='Job Requirements'
          margin='normal'
          multiline
          minRows={8}
          value={reqs}
          onChange={(e) => setReqs(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
