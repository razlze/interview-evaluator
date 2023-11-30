'use client';

import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ArrowBackward from '@mui/icons-material/ChevronLeftRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useContext, useState, useRef, useEffect } from 'react';
import { QuestionContext } from '../../../../providers/QuestionProvider';
import BoxWrapper from '../../../../shared/BoxWrapper';
import { useRouter } from 'next/navigation';

export default function QuestionForm() {
  const [questions, setQuestions] = useContext(QuestionContext);
  const [questionList, setQuestionList] = useState(questions);
  const [alertText, setAlertText] = useState(false);

  const router = useRouter();
  const scrollRef = useRef(null);

  const addQuestion = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].question == e.target.value) {
          setAlertText('You have already added this question');
          e.target.value = '';
          return;
        }
      }

      setAlertText(false);
      setQuestionList([
        ...questionList,
        { question: e.target.value, answer: '' },
      ]);
      e.target.value = '';
    }
  };

  const deleteQuestion = (deleteIndex) => {
    setQuestionList(questionList.filter((q, index) => index != deleteIndex));
  };

  const handleComplete = (e) => {
    e.preventDefault();
    if (questionList.length < 3) {
      setAlertText('Please have at least three questions');
    } else {
      setQuestions(questionList);
      router.push('/setup-overview');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setQuestions(questionList);
    router.push('/job-info');
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const newOrder = Array.from(questionList);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, JSON.parse(draggableId));
    setQuestionList(newOrder);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return (
    <Box component='form' onSubmit={handleComplete}>
      <BoxWrapper
        title='Interview Questions'
        imageSrc='/interviewQuestions.svg'
      >
        <Box
          width='90%'
          mt={-2}
          height={alertText && questionList.length >= 4 ? '20rem' : '18rem'}
          sx={{ paddingTop: '20px' }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <Box
                  ref={(el) => {
                    provided.innerRef(el);
                    scrollRef.current = el;
                  }}
                  {...provided.droppableProps}
                  width='100%'
                  maxHeight='13.9rem'
                  overflow='auto'
                  className='greyScroll'
                >
                  {questionList.map((item, index) => {
                    console.log(index);
                    return (
                      <Draggable
                        key={item.question}
                        draggableId={JSON.stringify(item)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Stack
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            direction='row'
                            gap={1}
                            sx={{
                              borderStyle: 'solid',
                              borderWidth: '1px',
                              borderColor: 'primary.light',
                              borderRadius: 2,
                              py: 0.1,
                              px: 1,
                              display: 'flex',
                              alignItems: 'center',
                              bgcolor: snapshot.isDragging
                                ? '#F1F8E9'
                                : 'white',
                              justifyContent: 'space-between',
                              mb: 1.5,
                              mx: 3,
                              boxShadow: snapshot.isDragging
                                ? '0px 4px 13.800000190734863px 0px #C8D5B94D'
                                : 'none',
                            }}
                          >
                            <Box
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              {...provided.dragHandleProps}
                            >
                              <DragIndicatorIcon htmlColor='#C8D5B9' />
                            </Box>
                            <Typography variant='body1' py={1} width='92%'>
                              {item.question}
                            </Typography>
                            <IconButton
                              aria-label='delete'
                              onClick={() => deleteQuestion(index)}
                            >
                              <DeleteRoundedIcon htmlColor='#C8D5B9' />
                            </IconButton>
                          </Stack>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Box px={3} mr={questionList.length > 4 ? 1 : 0}>
            <Stack
              direction='row'
              width='100%'
              sx={{
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'primary.light',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#F1F8E9',
                mb: 1.5,
                fontSize: '2rem',
              }}
            >
              <AddBoxRoundedIcon
                htmlColor='#C8D5B9'
                fontSize='inherit'
                sx={{ margin: 0.7 }}
              />
              <Input
                placeholder='Type out a question and press "Enter" to add it to your interview!'
                disableUnderline={true}
                fullWidth
                onKeyDown={addQuestion}
                inputProps={{
                  'aria-label': 'Add a question',
                }}
                sx={{ pr: 2 }}
              />
            </Stack>
            <Collapse in={alertText}>
              <Alert
                severity='error'
                sx={{
                  borderRadius: 2,
                  border: '1px solid #DEAFAF',
                  width: '95.5%',
                }}
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setAlertText(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                {alertText}
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </BoxWrapper>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginTop='2rem'
      >
        <Button
          variant='outlined'
          onClick={handleBack}
          startIcon={<ArrowBackward />}
          sx={{ pr: 6 }}
        >
          Back
        </Button>
        <Button
          type='submit'
          variant='contained'
          endIcon={<CheckRoundedIcon />}
        >
          Complete Setup
        </Button>
      </Box>
    </Box>
  );
}
