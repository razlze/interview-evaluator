import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(request) {
  const blob = await request.blob();

  const audio = new File([blob], 'answer.webm');

  const transcription = await openai.audio.transcriptions.create({
    file: audio,
    model: 'whisper-1',
  });

  const answer = transcription.text;

  return NextResponse.json({ answer });
}
