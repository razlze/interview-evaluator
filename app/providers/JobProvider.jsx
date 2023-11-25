'use client';

import { createContext, useState } from 'react';

export const JobContext = createContext([{}, () => {}]);

export default function JobProvider({ children }) {
  const [jobInfo, useJobInfo] = useState({
    title: 'Software Engineer',
    type: ['Internship', 'Full-time'],
    company: 'Google',
    reqs: 'Be cool',
  });

  return (
    <JobContext.Provider value={[jobInfo, useJobInfo]}>
      {children}
    </JobContext.Provider>
  );
}
