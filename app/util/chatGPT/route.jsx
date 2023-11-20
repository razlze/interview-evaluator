import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(request) {
  const context = await request.json();

  const completion = await openai.chat.completions.create({
    messages: context,
    model: 'gpt-3.5-turbo',
  });

  const res = completion.choices[0].message.content;

  return NextResponse.json({ res });
}
