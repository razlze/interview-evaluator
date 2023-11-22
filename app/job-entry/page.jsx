'use client';
import { Button, Box } from '@mui/material';
import JobForm from './job-form';

import BoxWrapper from '../shared/BoxWrapper';

export default async function Page() {
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
    <Box component='form'>
      <BoxWrapper
        title='Job Information'
        imageSrc='/jobInfo.svg'
        children={<JobForm></JobForm>}
      ></BoxWrapper>
      <Button
        variant='contained'
        sx={{ marginTop: '1rem' }}
        type='submit'
        onSubmit={handleNext}
      >
        Next
      </Button>
    </Box>
  );
}
