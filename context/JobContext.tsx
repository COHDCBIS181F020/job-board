import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([
    {
    id: 1,
    title: 'Frontend Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    jobType: 'Full-time',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    jobType: 'Full-time',
    description: 'Build RESTful APIs and microservices using Node.js and AWS.'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    jobType: 'Contract',
    description: 'Design intuitive and responsive user interfaces for mobile and web.'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    jobType: 'Full-time',
    description: 'Leverage large datasets to deliver personalized recommendations.'
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    company: 'Spotify',
    location: 'New York, NY',
    jobType: 'Remote',
    description: 'Develop cross-platform apps with React Native and ensure performance optimization.'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Docker Inc.',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    description: 'Automate CI/CD pipelines and manage Kubernetes-based infrastructure.'
  },
  {
    id: 7,
    title: 'Machine Learning Engineer',
    company: 'OpenAI',
    location: 'Remote',
    jobType: 'Part-time',
    description: 'Research and implement ML models in NLP and generative AI.'
  },
  {
    id: 8,
    title: 'Product Manager',
    company: 'Stripe',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    description: 'Own product roadmaps and work cross-functionally with engineering teams.'
  },
  {
    id: 9,
    title: 'Cybersecurity Analyst',
    company: 'Cisco',
    location: 'Austin, TX',
    jobType: 'Full-time',
    description: 'Monitor and respond to cyber threats and design mitigation strategies.'
  },
  {
    id: 10,
    title: 'Business Analyst',
    company: 'Salesforce',
    location: 'Chicago, IL',
    jobType: 'Contract',
    description: 'Analyze business processes and deliver data-driven insights.'
  },
  {
    id: 11,
    title: 'QA Engineer',
    company: 'Zoom',
    location: 'Remote',
    jobType: 'Full-time',
    description: 'Develop automated test suites and ensure software quality across platforms.'
  },
  {
    id: 12,
    title: 'Cloud Architect',
    company: 'Microsoft Azure',
    location: 'Redmond, WA',
    jobType: 'Full-time',
    description: 'Design scalable cloud solutions and provide architectural guidance.'
  },
  {
    id: 13,
    title: 'Game Developer',
    company: 'Epic Games',
    location: 'Cary, NC',
    jobType: 'Full-time',
    description: 'Develop gameplay features using Unreal Engine and C++.'
  },
  {
    id: 14,
    title: 'AI Researcher',
    company: 'DeepMind',
    location: 'London, UK',
    jobType: 'Full-time',
    description: 'Conduct foundational AI research and collaborate on publications.'
  },
  {
    id: 15,
    title: 'IT Support Specialist',
    company: 'Dell',
    location: 'Round Rock, TX',
    jobType: 'Full-time',
    description: 'Provide technical support for hardware and software issues.'
  }
    
  ]);

  const addJob = (job: Omit<Job, 'id'>) => {
    setJobs((prev) => [{ id: Date.now(), ...job }, ...prev]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
};
