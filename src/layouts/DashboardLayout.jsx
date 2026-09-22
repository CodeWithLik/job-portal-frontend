import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const DashboardLayout = ({ role, links }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (role && user.role !== role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Restricted</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {role === 'seeker' 
              ? "This section is exclusively for Job Seekers. Only candidate accounts can manage applications and access AI resume analysis."
              : role === 'recruiter'
              ? "This section is exclusively for Employers and Recruiters. Only employer accounts can post jobs and review applicants."
              : "This section requires Administrator privileges to access."}
          </p>
          <div className="flex flex-col gap-3">
            <Link to={`/${user.role}/dashboard`}>
              <Button className="w-full py-2.5">Go to My Dashboard</Button>
            </Link>
            <Link to="/login" onClick={() => localStorage.removeItem('token')}>
              <Button variant="outline" className="w-full py-2.5">Log Out / Switch Account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar userRole={role} onMenuClick={() => setIsSidebarOpen(prev => !prev)} />
      <Sidebar links={links} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="md:ml-64 p-4 sm:p-8 min-h-[calc(100vh-4rem)] flex flex-col transition-all duration-300 w-full md:w-[calc(100%-16rem)]">
        <div className="max-w-6xl mx-auto w-full flex-grow">
          <Outlet />
        </div>
        
        {/* Minimal Dashboard Footer Strip */}
        <div className="mt-12 w-full max-w-6xl mx-auto pb-10">
          <div className="border-t border-slate-200/60 pt-8 pb-4 flex items-center justify-center text-xs font-medium text-slate-600 select-none">
            <span>&copy; {new Date().getFullYear()} AI Job Portal. All rights reserved.</span>
            <span className="mx-3 text-slate-400 font-bold">&middot;</span>
            <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <span className="mx-3 text-slate-400 font-bold">&middot;</span>
            <Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Terms</Link>
            
            {role !== 'admin' && (
              <>
                <span className="mx-3 text-slate-400 font-bold">&middot;</span>
                <Link to="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Support</Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
