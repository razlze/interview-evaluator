'use client';

import { Grid, Typography, Box, Stack, Button } from '@mui/material';
import BoxWrapper from '../../../shared/BoxWrapper';

import { useEffect, useContext, useState } from 'react';
import { QuestionContext } from '../../../providers/QuestionProvider';
import FeedbackInfoPair from './FeedbackInfoPair';
import QuestionBox from './QuestionBox';
import FeedbackTabs from './FeedbackTabs';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { useRouter } from 'next/navigation';

const feedback = {
  overall: 'kajndkjasndkjnasdkjnaskjdnkajsnd',
  questions: [
    {
      focus: 'akjsdnkajsndkjansdkjnaskjd',
      love: 'kajsdnkjansdkjnasdkjnasd',
    },
  ],
};

export default function Feedback() {
  const [questions, setQuestions] = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState(-1); // -1 for overall feedback
  const router = useRouter();

  return (
    <Grid container columns={9}>
      <Grid
        item
        xs={2}
        pt='2rem'
        pr='2rem'
        sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
      >
        <QuestionBox
          question='Overall Performance'
          index={-1}
          active={currentQuestion}
          setActive={setCurrentQuestion}
        />
        <Box
          height={5}
          mb={3}
          mt={3}
          bgcolor='primary.light'
          borderRadius={1}
        />
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: '60vh',
            width: 'calc(100% + 1rem + 5px)',
          }}
        >
          <Stack spacing={2} sx={{ width: 'calc(100% - 1rem)' }}>
            {questions.map((question, index) => {
              return (
                <QuestionBox
                  key={index}
                  index={index}
                  question={question.question}
                  active={currentQuestion}
                  setActive={setCurrentQuestion}
                />
              );
            })}
          </Stack>
        </Box>
      </Grid>

      <Grid
        item
        pl='2rem'
        xs={7}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <BoxWrapper
          title='Interview Feedback'
          imageSrc='/feedback.svg'
          style={{ flexGrow: 1 }}
        >
          <Grid container sx={{ height: '100%' }}>
            {currentQuestion != -1 && (
              <Grid
                item
                maxHeight='15rem'
                paddingRight='3rem'
                paddingY='1.5rem'
                xs={6}
              >
                <Typography variant='h3'>
                  {questions[currentQuestion].question}
                </Typography>
                <Box
                  height={4}
                  mb={3}
                  mt={1.2}
                  width='3.5rem'
                  bgcolor='primary.main'
                  borderRadius={1}
                />
                <Typography>{questions[currentQuestion].answer}</Typography>
              </Grid>
            )}

            {currentQuestion == -1 && (
              <Grid
                item
                xs={12}
                bgcolor='secondary.light'
                borderRadius='.5rem'
                paddingY='1.5rem'
                paddingLeft='2rem'
                paddingRight='1rem'
              >
                <Typography variant='h3'>Overall Performance</Typography>
                <Box
                  height={4}
                  mb={3}
                  mt={1.2}
                  width='3.5rem'
                  bgcolor='primary.main'
                  borderRadius={1}
                />
                <Box overflow='auto'>
                  <Typography>{feedback.overall}</Typography>
                </Box>
              </Grid>
            )}
            {currentQuestion != -1 && (
              <Grid item xs={6} bgcolor='secondary.light' borderRadius='.5rem'>
                <FeedbackTabs />
              </Grid>
            )}
          </Grid>
        </BoxWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '2rem' }}>
          <Button
            variant='contained'
            sx={{ padding: '.5rem 1.5rem' }}
            startIcon={<ReplayRoundedIcon />}
            onClick={() => router.push('/setup-overview')}
          >
            Back to Interview Setup
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
