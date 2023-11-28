'use client';
import Feedback from './Feedback';
import Loading from './loading';
import { useEffect, useContext, useState } from 'react';

import { FeedbackContext } from '../../providers/FeedbackProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { JobContext } from '../../providers/JobProvider';

export default function Page() {
  const [questions, setQuestions] = useContext(QuestionContext);
  const [jobInfo, setJobInfo] = useContext(JobContext);
  const [feedback, setFeedback] = useContext(FeedbackContext);
  const [isComplete, setIsComplete] = useState(false);
  const [i, setI] = useState(false);

  const giveFeedback = async () => {
    const requestBody = {
      question: questions[0].question,
      answer: questions[0].answer,
      ...jobInfo,
    };
    const res = await fetch('/util/chatGPT?queryType=feedback', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    await res.json().then((res) => {
      setFeedback(res.res);
      // console.log(res.res);
    });
  };

  // const razi = () => {
  //   setFeedback({
  //     strengths: {
  //       'Resonating with company values':
  //         "It's excellent that you mentioned that you agree with the company's values on company transparency and growth. This shows that you have done your research on the company and understand its core values.",
  //       'Expressing interest in work culture':
  //         'Mentioning that you love the work culture of the company is a great way to show that you will be a good fit and are genuinely excited to work there.',
  //     },
  //     improvements: {
  //       'Align with job requirements':
  //         "Though you mentioned the company's work culture and values, it would be beneficial to also highlight how your skills and experiences align with the job requirements. This will demonstrate that you are qualified for the position and have what it takes to succeed in the role.",
  //       'Specificity in work culture':
  //         'While mentioning that you love the work culture is a positive, it would be even better if you can provide specific examples or aspects of the work culture that appeal to you. This would demonstrate a deeper understanding and connection with the company.',
  //       'Connect work culture to personal growth':
  //         "You mentioned that you agree with the company's values on growth, but it would be helpful to expand on this and discuss how the company's work culture and values align with your own personal growth and career goals. This will demonstrate that you not only align with the company but also have a clear vision for your own development.",
  //     },
  //   });
  // };

  useEffect(() => {
    // razi();
    // setIsComplete(true);
    giveFeedback();
    console.log(Object.keys(feedback).length);
    // setIsComplete(true);
    console.log('I love Razi');
  }, []);

  useEffect(() => {
    if (Object.keys(feedback).length !== 0) {
      setIsComplete(true);
      console.log(feedback);
    }
  }, [feedback]);

  return <>{isComplete ? <Feedback /> : <Loading />}</>;
}
