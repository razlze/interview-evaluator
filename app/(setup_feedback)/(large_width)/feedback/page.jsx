'use client';
import Feedback from './Feedback';
import Loading from './loading';
import { useEffect, useContext, useState } from 'react';

import { FeedbackContext } from '../../../providers/FeedbackProvider';
import { QuestionContext } from '../../../providers/QuestionProvider';
import { JobContext } from '../../../providers/JobProvider';

export default function Page() {
  const [questions] = useContext(QuestionContext);
  const [jobInfo] = useContext(JobContext);
  const [, setFeedback] = useContext(FeedbackContext);
  const [isComplete, setIsComplete] = useState(false);

  const getFeedback = async () => {
    const promiseArray = [...Array(questions.length).keys()].map(
      async (index) => {
        await questionFeedback(index);
      }
    );
    promiseArray.push(await overallFeedback());
    await Promise.all(promiseArray);
    setIsComplete(true);
  };

  const questionFeedback = async (index) => {
    const requestBody = {
      question: questions[index].question,
      answer: questions[index].answer,
      ...jobInfo,
    };
    const res = await fetch('/util/chatGPT?queryType=feedback', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    await res.json().then((res) => {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [index]: JSON.parse(res.res),
      }));
    });
  };

  const overallFeedback = async () => {
    const requestBody = {
      questions: questions,
      ...jobInfo,
    };
    const res = await fetch('/util/chatGPT?queryType=overall', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    await res.json().then((res) => {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        overall: res.res,
      }));
    });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return <>{isComplete ? <Feedback /> : <Loading />}</>;
}
