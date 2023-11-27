import { Grid } from '@mui/material';
import BoxWrapper from '../../../shared/BoxWrapper';

export default async function Page() {
  return (
    <Grid container columns={9}>
      <Grid item xs={2}></Grid>
      <Grid item xs={7}>
        <BoxWrapper
          title='Interview Feedback'
          imageSrc='/feedback.svg'
        ></BoxWrapper>
      </Grid>
    </Grid>
  );
}
