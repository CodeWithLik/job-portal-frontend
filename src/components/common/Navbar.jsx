import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Briefcase, User, LogOut, ChevronDown, Building, Menu } from 'lucide-react';
import { Button } from './Button';
import { useAuth, api } from '../../context/AuthContext';

export const Navbar = ({ userRole = null, onMenuClick }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}${url}`;
  };

  const roleName = user?.role === 'seeker' ? 'Job Seeker' : user?.role === 'recruiter' ? 'Recruiter' : user?.role === 'admin' ? 'Administrator' : '';
  const rawAvatarUrl = user?.avatar || user?.profile_photo || user?.profile_picture || user?.photo;
  const avatarUrl = getImageUrl(rawAvatarUrl);

  const primaryLabel = user?.role === 'recruiter' 
    ? (user?.company_name || user?.companyName || user?.name) 
    : user?.name;
    
  const initialFallback = primaryLabel ? primaryLabel.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button 
                onClick={onMenuClick}
                className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <Logo size="md" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
                <>
                  {/* Desktop Public Links */}
                  <div className="hidden md:flex items-center gap-4">
                    <Link to="/jobs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Find Jobs</Link>
                    <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Log In</Link>
                    <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                  
                  {/* Mobile Public Menu Toggle */}
                  <div className="md:hidden relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
                    >
                      <Menu className="h-6 w-6" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-2 py-1 flex flex-col gap-1">
                          <Link 
                            to="/jobs" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Find Jobs
                          </Link>
                          <Link 
                            to="/login" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Login
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link 
                            to="/register" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors focus:outline-none"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold overflow-hidden border border-blue-200 shrink-0">
                    {rawAvatarUrl ? (
                      <img src={avatarUrl} alt={primaryLabel} className="h-full w-full object-cover" />
                    ) : (
                      initialFallback
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{primaryLabel}</p>
                    <p className="text-xs text-gray-500 capitalize">{roleName}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-900 font-medium truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {user.role !== 'admin' && (
                      <div className="px-2 py-2">
                        {user.role === 'recruiter' && (
                          <Link 
                            to="/recruiter/company" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                          >
                            <Building className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            Company Profile
                          </Link>
                        )}
                        {user.role === 'seeker' && (
                          <Link 
                            to="/seeker/profile" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                          >
                            <User className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            View Profile
                          </Link>
                        )}
                      </div>
                    )}
                    
                    <div className={`px-2 py-2 ${user.role !== 'admin' ? 'border-t border-gray-100' : ''}`}>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors text-left group"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-gray-400 group-hover:text-red-600 transition-colors" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
