export const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechFlow',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for a Senior Frontend Developer to join our team...',
    matchScore: 92,
    postedAt: '2 days ago',
    requirements: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSys',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Join our core infrastructure team to build scalable APIs...',
    matchScore: 85,
    postedAt: '1 week ago',
    requirements: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: 3,
    title: 'Machine Learning Intern',
    company: 'AI Startup',
    location: 'San Francisco, CA',
    type: 'Internship',
    salary: '$40/hr',
    description: 'Looking for a passionate ML intern to work on NLP models.',
    matchScore: 78,
    postedAt: '3 days ago',
    requirements: ['Python', 'PyTorch', 'NLP']
  },
];

export const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'seeker', // 'seeker', 'recruiter', 'admin'
  skills: ['React', 'Node.js', 'Python', 'TailwindCSS'],
};

export const mockApplications = [
  {
    id: 101,
    job: mockJobs[0],
    status: 'Interviewing',
    appliedAt: '2026-08-15',
  },
  {
    id: 102,
    job: mockJobs[1],
    status: 'Pending',
    appliedAt: '2026-08-20',
  }
];

export const mockApplicants = [
  {
    id: 201,
    name: 'Alice Smith',
    skills: ['React', 'Redux', 'TypeScript'],
    matchScore: 95,
    status: 'Pending',
    resumeUrl: '#'
  },
  {
    id: 202,
    name: 'Bob Johnson',
    skills: ['Vue', 'JavaScript', 'CSS'],
    matchScore: 60,
    status: 'Rejected',
    resumeUrl: '#'
  }
];

export const mockAllUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'seeker', status: 'Active', joinedAt: '2026-01-15', lastActive: '2 hours ago', appsOrJobs: 12 },
  { id: 2, name: 'TechFlow HR', email: 'hr@techflow.com', role: 'recruiter', status: 'Active', joinedAt: '2026-02-10', lastActive: '10 mins ago', appsOrJobs: 4 },
  { id: 3, name: 'Admin User', email: 'admin@jobportal.com', role: 'admin', status: 'Active', joinedAt: '2025-12-01', lastActive: 'Just now', appsOrJobs: 0 },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'seeker', status: 'Suspended', joinedAt: '2026-05-22', lastActive: '1 month ago', appsOrJobs: 3 },
  { id: 5, name: 'DataSys Recruiter', email: 'recruit@datasys.com', role: 'recruiter', status: 'Active', joinedAt: '2026-06-30', lastActive: '1 day ago', appsOrJobs: 2 },
  { id: 6, name: 'Alice Walker', email: 'alice.w@example.com', role: 'seeker', status: 'Pending', joinedAt: '2026-08-28', lastActive: '2 days ago', appsOrJobs: 0 },
  { id: 7, name: 'Global Tech', email: 'careers@globaltech.com', role: 'recruiter', status: 'Active', joinedAt: '2026-07-15', lastActive: '5 hours ago', appsOrJobs: 18 }
];

export const mockStats = {
  totalUsers: 14320,
  newUsersThisMonth: 1245,
  newUsersGrowth: '+12.5%',
  totalJobs: 845,
  activeJobsGrowth: '+5.2%',
  totalApplications: 45200,
  applicationsGrowth: '+18.1%',
  aiAnalysesRun: 12500,
  avgAiMatch: 78,
  avgAiMatchGrowth: '+2.4%',
  activeRecruiters: 320,
  platformRevenue: '$15,400',
  revenueGrowth: '+8.3%'
};

export const mockActivity = [
  { id: 1, text: 'New recruiter registered (Global Tech)', time: '10 mins ago', type: 'user' },
  { id: 2, text: 'New job posted: Machine Learning Engineer', time: '1 hour ago', type: 'job' },
  { id: 3, text: 'Resume analyzed for Jane Smith', time: '2 hours ago', type: 'ai' },
  { id: 4, text: 'User account suspended (Spam activity)', time: '5 hours ago', type: 'alert' },
  { id: 5, text: 'Application submitted to Senior Frontend Dev', time: '6 hours ago', type: 'app' }
];

export const mockChartData = [
  { name: 'Jan', users: 4000, apps: 2400 },
  { name: 'Feb', users: 3000, apps: 1398 },
  { name: 'Mar', users: 2000, apps: 9800 },
  { name: 'Apr', users: 2780, apps: 3908 },
  { name: 'May', users: 1890, apps: 4800 },
  { name: 'Jun', users: 2390, apps: 3800 },
  { name: 'Jul', users: 3490, apps: 4300 },
];

