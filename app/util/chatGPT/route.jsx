import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

const firstMessageContext =
  "You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Speak only from the perspective of the interviewer. Do not include the time of day, or the interviewee's name. Welcome them to the interview and ask them the first question of: ";

const subsequentMessageContext =
  'You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Briefly acknowledge their previous answer and then ask them the next question of: ';

const lastMessageContext =
  'You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Respond to their last answer and thank them for joining you for the interview.';

const feedbackContext = '';

export async function POST(request) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const queryType = searchParams.get('queryType');

  let context = [];

  if (queryType == 'firstMessage') {
    const jobTitle = body.jobTitle;
    const questionToAsk = body.question;

    const systemContext = firstMessageContext
      .replace('*insert_job_here*', jobTitle)
      .concat(questionToAsk);

    context.push({
      role: 'system',
      content: systemContext,
    });
  } else if (queryType == 'subesequentMessage') {
    const jobTitle = body.jobTitle;
    const prevQuestion = body.prevQuestion;
    const prevAnswer = body.prevAnswer;
    const questionToAsk = body.question;

    const systemContext = subsequentMessageContext
      .replace('*insert_job_here*', jobTitle)
      .concat(questionToAsk);

    context.push({
      role: 'system',
      content: systemContext,
    });

    context.push({
      role: 'assistant',
      content: prevQuestion,
    });

    context.push({
      role: 'user',
      content: prevAnswer,
    });
  } else if (queryType == 'lastMessage') {
    const jobTitle = body.jobTitle;
    const prevQuestion = body.prevQuestion;
    const prevAnswer = body.prevAnswer;

    const systemContext = lastMessageContext.replace(
      '*insert_job_here*',
      jobTitle
    );

    context.push({
      role: 'system',
      content: systemContext,
    });

    context.push({
      role: 'assistant',
      content: prevQuestion,
    });

    context.push({
      role: 'user',
      content: prevAnswer,
    });
  }

  const completion = await openai.chat.completions.create({
    messages: context,
    model: 'gpt-3.5-turbo',
  });

  const res = completion.choices[0].message.content;

  return NextResponse.json({ res });
}
