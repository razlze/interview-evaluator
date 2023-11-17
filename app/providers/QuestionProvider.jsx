'use client';

import { createContext, useState } from 'react';

export const QuestionContext = createContext([{}, () => {}]);

export default function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([
    { question: 'Why do you want to work for our company?', answer: '' },
  ]);
  return (
    <QuestionContext.Provider value={[questions, setQuestions]}>
      {children}
    </QuestionContext.Provider>
  );
}
