import { Grid, Stack } from '@mui/material';
import BoxWrapper from '../../shared/BoxWrapper';
import TitleAndEdit from './TitleAndEdit';
import JobInfoPair from './JobInfoPair';
import InterviewQuestions from './InterviewQuestions';

export default async function Page() {
  return (
    <BoxWrapper
      title='Review Interview Setup'
      imageSrc='reviewInterviewSetup.svg'
    >
      <Grid container width='100%'>
        <Grid
          item
          bgcolor='secondary.light'
          xs={5}
          borderRadius='.5rem'
          padding='1.5rem 2rem'
        >
          <TitleAndEdit title='Job Information' />
          <Stack gap={2}>
            <JobInfoPair fieldName='Job Title' jobField='title' />
            <JobInfoPair fieldName='Job Type' jobField='type' />
            <JobInfoPair fieldName='Company' jobField='company' />
            <JobInfoPair fieldName='Job Requirements' jobField='reqs' />
          </Stack>
        </Grid>
        <Grid item xs={7} padding='1.5rem 3rem'>
          <TitleAndEdit title='Interview Questions' />
          <InterviewQuestions />
        </Grid>
      </Grid>
    </BoxWrapper>
  );
}
