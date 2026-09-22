import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Contact } from './pages/public/Contact';
import { Privacy } from './pages/public/Privacy';
import { Terms } from './pages/public/Terms';
import { About } from './pages/public/About';
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { ResetPassword } from './pages/public/ResetPassword';
import { VerifyEmail } from './pages/public/VerifyEmail';
import { FindJobs } from './pages/public/FindJobs';
import { JobDetails } from './pages/public/JobDetails';

// Seeker Pages
import { SeekerDashboard } from './pages/seeker/Dashboard';
import { Profile } from './pages/seeker/Profile';
import { SavedJobs } from './pages/seeker/SavedJobs';
import { Applications } from './pages/seeker/Applications';

// Recruiter Pages
import { RecruiterDashboard } from './pages/recruiter/Dashboard';
import { Applicants } from './pages/recruiter/Applicants';
import { ApplicantProfile } from './pages/recruiter/ApplicantProfile';
import { CompanyProfile } from './pages/recruiter/CompanyProfile';
import { PostJob } from './pages/recruiter/PostJob';
import { ManageJobs } from './pages/recruiter/ManageJobs';
import { EditJob } from './pages/recruiter/EditJob';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/Users';
import { AdminJobs } from './pages/admin/Jobs';
import { Activity as AdminActivity } from './pages/admin/Activity';
import { AdminApplications } from './pages/admin/Applications';
import { AdminSettings } from './pages/admin/Settings';

import { Home as HomeIcon, User, Briefcase, FileText, Bookmark, Users, Settings, PlusCircle, BarChart2, Search, Activity, Cpu } from 'lucide-react';

const seekerLinks = [
  { path: '/seeker/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/seeker/profile', label: 'My Profile', icon: User },
  { path: '/seeker/jobs', label: 'Find Jobs', icon: Briefcase },
  { path: '/seeker/saved', label: 'Saved Jobs', icon: Bookmark },
  { path: '/seeker/applications', label: 'My Applications', icon: FileText },
];

const recruiterLinks = [
  { path: '/recruiter/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/recruiter/company', label: 'Company Profile', icon: User },
  { path: '/recruiter/post-job', label: 'Post Job', icon: PlusCircle },
  { path: '/recruiter/jobs', label: 'Manage Jobs', icon: Briefcase },
  { path: '/recruiter/applicants', label: 'My Applicants', icon: Users },
];

const adminLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/admin/applications', label: 'Applications', icon: FileText },
  { path: '/admin/activity', label: 'Activity Log', icon: Activity },
  { path: '/admin/settings', label: 'System Settings', icon: Settings },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>

      <Route element={<DashboardLayout role="seeker" links={seekerLinks} />}>
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/profile" element={<Profile />} />
        <Route path="/seeker/jobs" element={<FindJobs />} />
        <Route path="/seeker/jobs/:id" element={<JobDetails />} />
        <Route path="/seeker/saved" element={<SavedJobs />} />
        <Route path="/seeker/applications" element={<Applications />} />
      </Route>

      <Route element={<DashboardLayout role="recruiter" links={recruiterLinks} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/company" element={<CompanyProfile />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/jobs" element={<ManageJobs />} />
        <Route path="/recruiter/jobs/edit/:id" element={<EditJob />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path="/recruiter/applicants/:id/profile" element={<ApplicantProfile />} />
      </Route>

      <Route element={<DashboardLayout role="admin" links={adminLinks} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/analytics" element={<Navigate to="/admin/activity" replace />} />
        <Route path="/admin/activity" element={<AdminActivity />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;
