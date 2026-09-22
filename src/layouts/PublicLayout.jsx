import { Footer } from '../components/common/Footer';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';

export const PublicLayout = () => {
  const { user } = useAuth();

  const getCandidateLink = (path) => {
    if (!user) return `/login?redirect=${encodeURIComponent(path)}`;
    if (user.role === 'seeker') return path;
    return '/jobs';
  };

  const getEmployerLink = (path) => {
    if (!user) return `/login?redirect=${encodeURIComponent(path)}&role=recruiter`;
    if (user.role === 'recruiter') return path;
    return '/';
  };

  return (
    <div className="pt-16">
      <Navbar />
      <main className="min-h-[calc(100vh-18rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
