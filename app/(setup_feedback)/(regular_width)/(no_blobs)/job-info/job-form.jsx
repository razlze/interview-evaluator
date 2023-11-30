'use client';

import { Grid, TextField, Button, Box } from '@mui/material';
import MultipleSelectChip from './components/multiselect';
import { useContext, useState } from 'react';
import { JobContext } from '../../../../providers/JobProvider';
import { useRouter } from 'next/navigation';
import BoxWrapper from '../../../../shared/BoxWrapper';
import ArrowForward from '@mui/icons-material/ChevronRightRounded';

export default function JobForm() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [title, setTitle] = useState(jobInfo.title);
  const [company, setCompany] = useState(jobInfo.company);
  const [reqs, setReqs] = useState(jobInfo.reqs);
  const [type, setType] = useState(jobInfo.type);
  const router = useRouter();

  const removeWhitespace = (text) => {
    return text.trim().length === 0 ? '' : text;
  };

  const handleNext = (e) => {
    e.preventDefault();
    setJobInfo({
      title: removeWhitespace(title),
      type: type,
      company: removeWhitespace(company),
      reqs: removeWhitespace(reqs),
    });
    router.push('/question-entry');
  };

  return (
    <Box component='form' onSubmit={handleNext}>
      <BoxWrapper title='Job Information' imageSrc='/jobInfo.svg'>
        <Grid container spacing={5} flexDirection='row'>
          <Grid item container flexDirection='column' xs={6}>
            <TextField
              required
              label='Job Title'
              fullWidth
              margin='normal'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 0.5 }}
            />
            <MultipleSelectChip jobType={type} setJobType={setType} />
            <TextField
              fullWidth
              margin='normal'
              label='Company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              sx={{ mt: 1.5 }}
            />
          </Grid>
          <Grid item container xs={6} height='100%'>
            <TextField
              inputProps={{ className: 'greyScroll' }}
              fullWidth
              label='Job Requirements'
              margin='normal'
              multiline
              minRows={8}
              maxRows={8}
              value={reqs}
              onChange={(e) => setReqs(e.target.value)}
            />
          </Grid>
        </Grid>
      </BoxWrapper>
      <Box
        display='flex'
        justifyContent='end'
        alignItems='center'
        marginTop='2rem'
      >
        <Button variant='outlined' type='submit' endIcon={<ArrowForward />}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
