'use client';

// using provided audio recorder, will replace with custom UI later
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { Button } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import WebCamera from './webcam';
import { JobContext } from '../providers/JobProvider';
import { QuestionContext } from '../providers/QuestionProvider';

export default function Interview() {
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [questions, setQuestions] = useContext(QuestionContext);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

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

    const result = await res.json().then((res) => console.log(res.res));

    if (questionsAnswered < questions.length) {
      startRecording();
    } else {
      console.log('end of interview');
    }
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
    askQuestion();
  }, [questionsAnswered]);

  return (
    <>
      <WebCamera />
      <Button
        variant='contained'
        onClick={toggleRecord}
        sx={{ marginTop: '1rem' }}
      >
        {isRecording ? 'Stop' : 'Start Recording'}
      </Button>
    </>
  );
}
