import { Typography, Box, Grid, Divider } from '@mui/material';
import Image from 'next/image';
import UserDetailsForm from './UserDetailsForm';

function FeatureBox({ title, text, image }) {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          background: 'linear-gradient(133deg, #8FC0A9 26.92%, #C8D5B9 100%);',
          boxShadow: '0px 4px 16.8px 0px #C8D5B9',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <Image src={image} alt='icon' width={70} height={70} />
        <Typography
          sx={{
            fontSize: '1.5rem',
            color: 'primary.dark',
            fontWeight: 700,
            marginTop: '0.5rem',
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'primary.dark' }}>{text}</Typography>
      </Box>
    </Grid>
  );
}

export default async function Home() {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          height: '50%',
          backgroundColor: 'white',
          bottom: 20,
          width: '62rem',
          zIndex: 1,
          borderRadius: '1.25rem',
          boxShadow: '0px 4px 33.5px 1px rgba(0, 0, 0, 0.25);',
        }}
      />
      <Image
        src={'getStartedImage.svg'}
        alt='Get Started'
        style={{
          position: 'absolute',
          width: '31rem',
          height: '45%',
          right: 0,
          top: 0,
        }}
        width={40}
        height={40}
      />
      <Box p={9} pt={4} sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ width: '60%' }}>
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'primary.dark',
            }}
          >
            AI Interviewer
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', color: 'primary.dark' }}>
            Improve your interview skills with AI! Do a mock interview and get
            helpful feedback!
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
          <FeatureBox
            title='CUSTOMIZE'
            text='Provide job details and add your own questions to tailor the interview to your needs'
            image='customizeIcon.svg'
          ></FeatureBox>
          <FeatureBox
            title='INTERVIEW'
            text='Sit in a mock interview with our AI interviewer and answer questions tailored to you'
            image='interviewIcon.svg'
          ></FeatureBox>
          <FeatureBox
            title='FEEDBACK'
            text='Read about your strengths and improvements for each of your interview answers to improve'
            image='feedbackIcon.svg'
          ></FeatureBox>
        </Grid>
        <Divider
          sx={{
            marginY: '2.5rem',
            '&.MuiDivider-root::after, &.MuiDivider-root::before': {
              borderTop: '2px solid rgba(53, 79, 82, 0.17)',
            },
          }}
        >
          <Typography
            sx={{ color: 'primary.dark', fontWeight: 600, marginX: '1rem' }}
          >
            Enter your name to get started!
          </Typography>
        </Divider>
        <UserDetailsForm />
      </Box>
    </>
  );
}
