'use client';

import { createContext, useState } from 'react';

export const QuestionContext = createContext([{}, () => {}]);

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([
    {
      question: 'Why do you want to work for our company?',
      answer:
        "Because I love the work culture of your company and agree with the company's values on company transparency and growth.",
    },
    {
      question: 'What is your favourite programming language and why?',
      answer:
        'My favourite programming language is Python because it allows me to code in fewer lines and is the language of Machine Learning.',
    },
    {
      question: 'What are your salary expectations?',
      answer:
        'My salary expectations are in between $30 per hour and $40 per hour.',
    },
  ]);
  return (
    <QuestionContext.Provider value={[questions, setQuestions]}>
      {children}
    </QuestionContext.Provider>
  );
}
