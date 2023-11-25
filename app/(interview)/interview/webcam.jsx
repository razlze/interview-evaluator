'use client';

import Webcam from 'react-webcam';

export default function WebCamera() {
  return (
    <Webcam
      mirrored
      style={{ width: '70%', marginTop: '3rem', borderRadius: '1rem' }}
      audio={false}
    />
  );
}
