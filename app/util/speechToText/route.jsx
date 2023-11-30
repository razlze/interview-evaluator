import OpenAI from 'openai';
import { NextResponse } from 'next/server';
// import * as fs from 'node:fs';

const openai = new OpenAI();

export const runtime = 'edge';

export async function POST(request) {
  const blob = await request.blob();

  // fs.writeFileSync('/tmp/audio.mp3', Buffer.from(await blob.arrayBuffer()));
  const audio = new File([blob], 'answer.webm');

  const transcription = await openai.audio.transcriptions.create({
    // file: fs.createReadStream('/tmp/audio.mp3'),
    file: audio,
    model: 'whisper-1',
  });

  const answer = transcription.text;

  return NextResponse.json({ answer });
}
