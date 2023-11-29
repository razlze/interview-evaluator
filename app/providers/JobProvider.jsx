'use client';

import { createContext, useState } from 'react';

export const JobContext = createContext([{}, () => {}]);

export default function JobProvider({ children }) {
  const [jobInfo, useJobInfo] = useState({
    title: 'Software Engineer (Student Training in Engineering Program)',
    type: ['Internship', 'Full-time'],
    company: 'Google',
    reqs: `First or second-year Bachelor's student majoring in Computer Science or a related field.
    Programming experience in C, C++, Java, JavaScript or Python.
    First year students have taken at least one college computer science course (AP or IB will meet course requirements). Second-year students must have completed at least two college computer sciences courses.
    Currently attending a university in North America.`,
  });

  return (
    <JobContext.Provider value={[jobInfo, useJobInfo]}>
      {children}
    </JobContext.Provider>
  );
}
