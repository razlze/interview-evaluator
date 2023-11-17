import OpenAI from 'openai';

const openai = new OpenAI();

export async function getGPTResponse(context) {
  const completion = await openai.chat.completions.create({
    messages: context,
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0].message.content;
}
