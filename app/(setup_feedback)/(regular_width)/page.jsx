import Image from 'next/image';
import OpenAI from 'openai';

const openai = new OpenAI();

export default async function Home() {
  return <h1>Get Started</h1>;
}
