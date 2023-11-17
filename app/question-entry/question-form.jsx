'use client';

import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useContext, useState } from 'react';
import { QuestionContext } from '../providers/QuestionProvider';

export default function QuestionForm() {
  const [questions, setQuestions] = useContext(QuestionContext);
  const [questionList, setQuestionList] = useState(questions);

  const addQuestion = (e) => {
    if (e.key === 'Enter') {
      setQuestionList([...questionList, e.target.value]);
      e.target.value = '';
      e.preventDefault();
    }
  };

  const deleteQuestion = (e) => {
    setQuestionList(questionList.filter((q, index) => index != e.target.id));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setQuestions(questionList);
  };

  return (
    <Box component='form' sx={{ paddingTop: '20px' }} onSubmit={handleNext}>
      {questionList.map((q, index) => (
        <Card key={index} sx={{ marginBottom: '10px' }}>
          <CardContent>{q}</CardContent>
          <CardActions>
            <Button id={index} size='small' onClick={deleteQuestion}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      <TextField
        id='outlined-basic'
        label='Add Question'
        variant='outlined'
        fullWidth
        margin='normal'
        onKeyDown={addQuestion}
      />
      <Button variant='contained' sx={{ marginTop: '1rem' }} type='submit'>
        Next
      </Button>
    </Box>
  );
}
