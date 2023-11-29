'use client';

import { createContext, useState } from 'react';

export const QuestionContext = createContext([{}, () => {}]);

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([
    {
      question: 'Why do you want to work for our company?',
      answer:
        'I would like to work for your company because I am passionate about the technologies that your company works with.',
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
