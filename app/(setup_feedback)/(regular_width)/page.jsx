import Image from 'next/image'
import OpenAI from "openai"

const openai = new OpenAI();

// async function useGPT() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "Write a poem for my girlfriend." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
//   return completion;
// }


export default async function Home() {
  // const response = await useGPT();

  return (
    <h1>Get Started</h1>
  )
}
