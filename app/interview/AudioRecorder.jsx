'use client';

// using provided audio recorder, will replace with custom UI later
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { Button } from '@mui/material';
import { useEffect } from 'react';

export default function AudioRecording() {
  const parseAudio = async (blob) => {
    const res = await fetch('http://localhost:3000/util/speechToText', {
      method: 'POST',
      body: blob,
    });

    const result = await res.json().then((res) => console.log(res.answer));
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

  return (
    <Button
      variant='contained'
      onClick={toggleRecord}
      sx={{ marginTop: '1rem' }}
    >
      {isRecording ? 'Stop' : 'Start Recording'}
    </Button>
  );
}
