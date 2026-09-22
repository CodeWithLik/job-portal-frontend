import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Briefcase, Github, Linkedin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { user } = useAuth();

  const getCandidateLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    // Let the router handle role mismatches by showing the Access Restricted screen
    return path;
  };

  const getEmployerLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    // Let the router handle role mismatches by showing the Access Restricted screen
    return path;
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-block transition-transform hover:opacity-90">
                  <Logo size="md" isDark={true} />
                </Link>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Empowering candidates with AI resume feedback while giving employers a seamless platform to post jobs and review applicants.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">X</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: For Candidates */}
            <div>
              <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to={user?.role === 'seeker' ? '/seeker/jobs' : '/jobs'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link to={getCandidateLink('/seeker/profile')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">AI Resume Analysis</Link></li>
                <li><Link to={getCandidateLink('/seeker/saved')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Saved Jobs</Link></li>
                <li><Link to={getCandidateLink('/seeker/applications')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">My Applications</Link></li>
              </ul>
            </div>

            {/* Column 3: For Employers */}
            <div>
              <h4 className="text-white font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to={getEmployerLink('/recruiter/dashboard')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Employer Dashboard</Link></li>
                <li><Link to={getEmployerLink('/recruiter/post-job')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to={getEmployerLink('/recruiter/jobs')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Manage Jobs</Link></li>
                <li><Link to={getEmployerLink('/recruiter/applicants')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Review Applicants</Link></li>
                
              </ul>
            </div>

            {/* Column 4: Company & Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company & Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Sub-Footer Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              &copy; {new Date().getFullYear()} AI Job Portal. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500/90 font-medium">Systems Operational</span>
              </div>
              <div className="flex gap-4">
                <Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};
