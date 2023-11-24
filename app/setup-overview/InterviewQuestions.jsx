'use client';

import { List, ListItem, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { QuestionContext } from '../providers/QuestionProvider';

export default function InterviewQuestions() {
  const [questions] = useContext(QuestionContext);

  return (
    <List sx={{ listStyle: 'decimal', pl: 4 }}>
      {questions.map((q, index) => {
        return (
          <ListItem key={index} sx={{ display: 'list-item' }}>
            <ListItemText primary={q.question} />
          </ListItem>
        );
      })}
    </List>
  );
}
