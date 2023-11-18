'use client';

// using provided audio recorder, will replace with custom UI later
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function AudioRecording() {
  const parseAudio = async (blob) => {
    const res = await fetch('http://localhost:3000/util/speechToText', {
      method: 'POST',
      body: blob,
    });

    const result = await res.json().then((res) => console.log(res.answer));
  };

  return (
    <AudioRecorder
      onRecordingComplete={parseAudio}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
    />
  );
}
