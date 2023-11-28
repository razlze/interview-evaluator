import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

const firstMessageContext =
  "You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Speak only from the perspective of the interviewer. Do not include the time of day, or the interviewee's name. Welcome them to the interview and ask them the first question of: ";

const subsequentMessageContext =
  'You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Briefly acknowledge their previous answer and then ask them the next question of: ';

const lastMessageContext =
  'You are an interviewer interviewing a candidate for the role of a *insert_job_here*. Respond to their last answer and thank them for joining you for the interview.';

const feedbackContext = `
Your role is to give feedback to a candidate who just did an interview. The question they were asked by the interviewer is "Why do you want to work for our company?". 
  The candidate's answer to this question is "Because I love the work culture of your company and agree with the company's values on company transparency and growth.". 
  For context, the candidate is applying for the position Software Engineer (Student Training in Engineering Program) at the company Google. The type of positions they are applying for 
  are the following: Internship, Full-time. The requirements for this job are the following: "First or second-year Bachelor's student majoring in Computer Science or a related field.
    Programming experience in C, C++, Java, JavaScript or Python.
    First year students have taken at least one college computer science course (AP or IB will meet course requirements). Second-year students must have completed at least two college computer sciences courses.
    Currently attending a university in North America.". 
  Please limit the feedback to 200 words and do not repeat the question or the answer. You are speaking to the candidate in second person. Please organize your answer into two sections: "strengths" and "improvements", where the "strengths" section talks about what the candidate did well and the "improvements" section talks about areas of improvement for the candidate's answer. For each section, add a heading that highlights each point made. The response should be in a JSON format like the following

{
strengths: {
    "feedback_heading_1": "feedback_1",
    "feedback_heading_2": "feedback_2",
}, improvements: {
   "feedback_heading_1": "feedback_1",
    "feedback_heading_2": "feedback_2",
    "feedback_heading_2": "feedback_3",
}
}

where feedback_heading_* is replaced by the heading that the category of the feedback you have, and feedback_* is replaced by the content of the feedback. The "strengths" and "improvements" sections can have anywhere between one to five feedback points. 

Here is an example:

{
strengths: {
    "Personalized answers": "Good job in making the company personal to you by providing examples!",
    "Adding your impact": "It's great to always say what impact you had in the previous companies you worked at. What you said was great!",
}, improvements: {
   "Be more specific" : "Add more details in your answers by recounting a specific scenario or example that you remember from the past. This will make your answer more authentic",
}
}
`;

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
  } else if (queryType == 'feedback') {
    const question = body.question;
    const answer = body.answer;
    const jobTitle = body.title;
    const jobType = body.type;
    const jobCompany = body.company;
    const jobReqs = body.reqs;

    const systemContext = feedbackContext
      .replace('*insert_question_here*', question)
      .replace('*insert_answer_here*', answer)
      .replace('*insert_title_here*', jobTitle)
      .replace('*insert_type_here*', jobType.join(', '))
      .replace('*insert_company_here*', jobCompany)
      .replace('*insert_reqs_here*', jobReqs);

    context.push({
      role: 'system',
      content: systemContext,
    });
  }

  const completion = await openai.chat.completions.create({
    messages: context,
    model: 'gpt-3.5-turbo',
  });

  const res = completion.choices[0].message.content;

  return NextResponse.json({ res });
}
