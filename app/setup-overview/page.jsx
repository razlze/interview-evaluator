import { Grid } from '@mui/material';
import BoxWrapper from '../shared/BoxWrapper';
import TitleAndEdit from './TitleAndEdit';

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
          xs={6}
          borderRadius='.5rem'
          padding='1.5rem 2rem'
        >
          <TitleAndEdit title='Job Information' />
        </Grid>
        <Grid item xs={6} padding='1.5rem 2rem'>
          <TitleAndEdit title='Interview Questions' />
        </Grid>
      </Grid>
    </BoxWrapper>
  );
}
