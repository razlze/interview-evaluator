'use client';

// using provided audio recorder, will replace with custom UI later
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { Button, Box, Typography, Grid } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import WebCamera from './webcam';
import { JobContext } from '../../providers/JobProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Interview() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [questions, setQuestions] = useContext(QuestionContext);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [initialRender, setInitialRender] = useState(true);

  const parseAudio = async (blob) => {
    const res = await fetch('/util/speechToText', {
      method: 'POST',
      body: blob,
    });

    const result = await res.json();

    const newQuestions = questions.slice();

    newQuestions[questionsAnswered]['answer'] = result.answer;

    setQuestions(newQuestions);
    setQuestionsAnswered(questionsAnswered + 1);

    console.log(result.answer);
  };

  const askQuestion = async () => {
    const fetchBase = '/util/chatGPT?queryType=';
    let fetchURL = '';
    let requestBody = {};

    if (questionsAnswered == 0) {
      fetchURL = fetchBase.concat('firstMessage');
      requestBody = {
        jobTitle: jobInfo.title,
        question: questions[0].question,
      };
    } else if (questionsAnswered < questions.length) {
      fetchURL = fetchBase.concat('subesequentMessage');
      requestBody = {
        jobTitle: jobInfo.title,
        question: questions[questionsAnswered].question,
        prevQuestion: questions[questionsAnswered - 1].question,
        prevAnswer: questions[questionsAnswered - 1].answer,
      };
    } else {
      fetchURL = fetchBase.concat('lastMessage');
      requestBody = {
        jobTitle: jobInfo.title,
        prevQuestion: questions[questionsAnswered - 1].question,
        prevAnswer: questions[questionsAnswered - 1].answer,
      };
    }

    const res = await fetch(fetchURL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const result = await res.json().then((res) => {
      textToSpeech(res.res);
    });
  };

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder({
    noiseSuppression: true,
    echoCancellation: true,
  });

  const toggleRecord = (e) => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    if (!recordingBlob) return;
    parseAudio(recordingBlob);
  }, [recordingBlob]);

  useEffect(() => {
    if (!initialRender) {
      // askQuestion();
    } else {
      setInitialRender(false);
    }
  }, [questionsAnswered]);

  const textToSpeech = async (input) => {
    const res = await fetch('util/textToSpeech', {
      method: 'POST',
      body: JSON.stringify({
        text: input,
      }),
    });

    const result = await res.arrayBuffer();

    const blob = new Blob([result], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);

    audio.addEventListener('ended', function () {
      if (questionsAnswered < questions.length) {
        startRecording();
      }
    });

    audio.play();
  };

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box>
          <Typography variant='h2'>Welcome to your interview, Razi</Typography>
          <Box
            height={5}
            mb={4}
            mt={2}
            width='6rem'
            bgcolor='primary.main'
            borderRadius={1}
          />
        </Box>
        <Box
          sx={{
            marginLeft: 'auto',
            bgcolor: '#E6F3ED',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '3rem',
            width: '10.45rem',
          }}
        >
          <Typography variant='green'>4 questions left</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: '#DDDDDD',
              borderRadius: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Player
              autoplay
              loop
              src='/Interviewer.json'
              style={{ width: '25rem' }}
            ></Player>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <WebCamera />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        onClick={toggleRecord}
        sx={{ marginTop: '1rem' }}
      >
        {isRecording ? 'Stop' : 'Start Recording'}
      </Button>
      <Button onClick={askQuestion} variant='outlined'>
        Start Interview
      </Button>
    </>
  );
}
