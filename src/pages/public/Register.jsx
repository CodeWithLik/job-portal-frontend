import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card, CardBody } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, systemSettings, fetchSystemSettings } = useAuth();
  
  // Extract OAuth token from URL if present
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get('token');
  const redirectUrl = queryParams.get('redirect');

  // Intercept Google OAuth callback token
  useEffect(() => {
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.location.href = redirectUrl || '/';
    }
  }, [urlToken, redirectUrl]);

  // Always get fresh settings when visiting this page or focusing the browser tab
  useEffect(() => {
    if (fetchSystemSettings) {
      fetchSystemSettings();
    }
    
    const handleFocus = () => {
      if (fetchSystemSettings) fetchSystemSettings();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []); // Empty dependency array to prevent infinite loop
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker',
    company_name: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if registration for the selected role is disabled
  const isRegistrationDisabled = formData.role === 'seeker' 
    ? systemSettings?.allow_user_registration === false 
    : systemSettings?.allow_recruiter_registration === false;
  
  const disabledMessage = formData.role === 'seeker' 
    ? "Seeker registration is currently disabled by administration."
    : "Recruiter registration is currently disabled by administration.";
  const formTopRef = useRef(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    // Clear field-specific error when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: null }));
    }
    // Clear general error if it's not the duplicate email error
    if (error && !duplicateEmailError) setError('');
    if (duplicateEmailError) setDuplicateEmailError(false);
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setFieldErrors({});
    setError('');
    setDuplicateEmailError(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Please enter a valid full name (minimum 3 characters).';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else {
      const emailRegex = /^[^\s@\/]+@[^\s@\/]+\.[^\s@\/]{2,}$/;
      if (/\s/.test(formData.email) || /\.\./.test(formData.email) || /\/\//.test(formData.email) || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else {
      const missing = [];
      if (formData.password.length < 8) missing.push('8 characters');
      if (!/[A-Z]/.test(formData.password)) missing.push('an uppercase letter');
      if (!/[0-9]/.test(formData.password)) missing.push('a number');
      if (!/[^A-Za-z0-9]/.test(formData.password)) missing.push('a special character');

      if (missing.length === 1) {
        errors.password = `Password must contain at least ${missing[0].replace('an uppercase', 'one uppercase').replace('a special', 'one special').replace('a number', 'one number')}.`;
      } else if (missing.length > 1) {
        if (missing.length === 4) {
          errors.password = 'Password must contain at least 8 characters, an uppercase letter, a number, and a special character.';
        } else {
          const last = missing.pop();
          errors.password = `Password must contain at least ${missing.join(', ')}, and ${last}.`;
        }
      }
    }
    
    if (formData.role === 'recruiter') {
      if (!formData.company_name || !formData.company_name.trim()) {
        errors.company_name = 'Company Name is required.';
      } else if (formData.company_name.trim().length < 2) {
        errors.company_name = 'Please enter a valid company name (minimum 2 characters).';
      }
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must agree to the Terms of Service and Privacy Policy to register.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isRegistrationDisabled) return;
    
    if (!validateForm()) {
      // Scroll to top of form if there are validation errors
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setError('');
    setDuplicateEmailError(false);
    setIsLoading(true);

    try {
      await register(formData);
      navigate('/login', { state: { message: 'Registration successful! Please check your email to verify your account.' } });
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to register. Please try again.';
      
      if (
        (err.response?.status === 409 && errorMsg.toLowerCase().includes('email')) ||
        errorMsg.toLowerCase().includes('user already exists')
      ) {
        setDuplicateEmailError(true);
      } else if (errorMsg.toLowerCase().includes('password')) {
        setFieldErrors(prev => ({ ...prev, password: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('email') || errorMsg.includes('@')) {
        setFieldErrors(prev => ({ ...prev, email: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('name')) {
        setFieldErrors(prev => ({ ...prev, name: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('company')) {
        setFieldErrors(prev => ({ ...prev, company_name: errorMsg }));
      } else {
        setError(errorMsg);
      }
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google?redirect=${encodeURIComponent(redirectUrl || '')}&role=${formData.role}`;
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="w-full max-w-md shadow-xl border-0 ring-1 ring-gray-200">
          <CardBody className="p-5 sm:p-6">
            <div className="mb-5" ref={formTopRef}>
              <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">Create an Account</h2>
              <p className="text-center text-sm text-gray-600 mb-3">
                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Log In</Link>
              </p>
            </div>
            
            {isRegistrationDisabled && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{disabledMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {!isRegistrationDisabled && duplicateEmailError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      An account with this email already exists. 
                      <Link to="/login" className="underline font-semibold hover:text-rose-900 ml-1">Log In</Link>
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-rose-400 hover:text-rose-600 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {!isRegistrationDisabled && error && !duplicateEmailError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setError('')} className="text-rose-400 hover:text-rose-600 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <form className="flex flex-col" onSubmit={handleRegister} noValidate>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    type="button"
                    className={`flex-1 py-1 text-sm font-medium rounded-md transition-colors ${formData.role === 'seeker' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleRoleToggle('seeker')}
                  >
                    Job Seeker
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-1 text-sm font-medium rounded-md transition-colors ${formData.role === 'recruiter' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => handleRoleToggle('recruiter')}
                  >
                    Recruiter / Employer
                  </button>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 flex justify-center items-center gap-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={handleGoogleAuth} disabled={isLoading || isRegistrationDisabled}
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

              <Input disabled={isRegistrationDisabled} wrapperClassName="mb-2" 
                label="Full Name" 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
              />
              <Input disabled={isRegistrationDisabled} wrapperClassName="mb-2" 
                label="Email address" 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
              />
              <Input disabled={isRegistrationDisabled} wrapperClassName="mb-2" 
                label="Password" 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
              />
              
              {formData.role === 'recruiter' && (
                <Input disabled={isRegistrationDisabled} wrapperClassName="mb-2" 
                  label="Company Name" 
                  id="company_name" 
                  type="text" 
                  placeholder="Acme Corp" 
                  value={formData.company_name}
                  onChange={handleChange}
                  error={fieldErrors.company_name}
                />
              )}

              <div className="space-y-1 mb-2 mt-1">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      id="acceptTerms" disabled={isRegistrationDisabled}
                      checked={formData.acceptTerms || false}
                      onChange={handleChange}
                      className={`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors ${fieldErrors.acceptTerms ? 'border-red-500 ring-red-500' : ''}`}
                    />
                  </div>
                  <span className="text-sm text-slate-600 leading-tight">
                    I agree to the{' '}
                    <Link to="/terms" target="_blank" className="text-blue-600 font-medium hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" target="_blank" className="text-blue-600 font-medium hover:underline">Privacy Policy</Link>.
                  </span>
                </label>
                {fieldErrors.acceptTerms && <p className="text-xs text-red-500 pl-6 animate-in slide-in-from-top-1 duration-200">{fieldErrors.acceptTerms}</p>}
              </div>

              <Button type="submit" className="w-full mt-1" disabled={isLoading || isRegistrationDisabled}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
