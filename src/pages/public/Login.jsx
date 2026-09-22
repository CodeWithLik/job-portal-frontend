import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card, CardBody } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, X, Loader2, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const formTopRef = useRef(null);
  const successMessage = location.state?.message;

  // Scroll to success message if it exists
  useEffect(() => {
    if (successMessage) {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [successMessage]);

  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get('token');
  const redirectUrl = queryParams.get('redirect');

  useEffect(() => {
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.location.href = redirectUrl || '/';
    }
  }, [urlToken, redirectUrl]);
  
  if (urlToken) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">Authenticating...</h2>
        <p className="text-sm text-gray-500 mt-2">Securely logging you into your portal</p>
      </div>
    );
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuspended, setIsSuspended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuspended(false);
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      
      if (redirectUrl) {
        const isRoleMismatch = 
          (redirectUrl.startsWith('/seeker/') && user.role !== 'seeker') ||
          (redirectUrl.startsWith('/recruiter/') && user.role !== 'recruiter') ||
          (redirectUrl.startsWith('/admin/') && user.role !== 'admin');
          
        if (isRoleMismatch) {
          navigate(`/${user.role}/dashboard`);
        } else {
          navigate(redirectUrl);
        }
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.message?.toLowerCase().includes('suspended')) {
        setError('Your account has been suspended');
        setIsSuspended(true);
      } else if (err.response?.status === 401 && err.response?.data?.error === 'Invalid credentials') {
        setError('Invalid email or password');
        setIsSuspended(false);
      } else {
        setError(err.response?.data?.error || 'Failed to log in. Please check your credentials.');
        setIsSuspended(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    if (error) {
      setError('');
      setIsSuspended(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'https://job-portal-backend-bx41.onrender.com/api'}/auth/google?redirect=${encodeURIComponent(redirectUrl || '')}`;
  };

  return (
    <div className="flex-grow w-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full mx-auto">
        <CardBody className="p-5 sm:p-6">
          <div ref={formTopRef}>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">Log In</h2>
            <p className="text-center text-sm text-gray-600 mb-3">
              Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
            </p>
          </div>
          
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{successMessage}</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <p className="font-medium">{error}</p>
                  {isSuspended && (
                    <p className="mt-1 font-normal">
                      Please check your email for details on why this action was taken, or contact support for assistance.
                    </p>
                  )}
                </div>
              </div>
              <button type="button" onClick={clearError} className="text-rose-400 hover:text-rose-600 transition-colors ml-3">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form className="flex flex-col" onSubmit={handleLogin} noValidate>
            
            <Button
              type="button"
              variant="outline"
              className="w-full flex justify-center items-center gap-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 mb-1"
              onClick={handleGoogleAuth}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="relative mt-3 mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
  
            <div className="flex flex-col">
              <Input 
                label="Email address" 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                required 
              />
              <Input 
                label="Password" 
                labelRight={<Link to="/forgot-password" className="text-blue-600 hover:text-blue-500 font-medium">Forgot password?</Link>}
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                required 
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
