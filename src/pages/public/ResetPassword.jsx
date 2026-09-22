import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card, CardBody } from '../../components/common/Card';
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors = {};

    // 1. Password Strength Validation
    if (!password) {
      errors.password = 'Password is required.';
    } else {
      const passErrors = [];
      if (password.length < 8) passErrors.push('at least 8 characters');
      if (!/[A-Z]/.test(password)) passErrors.push('an uppercase letter');
      if (!/[a-z]/.test(password)) passErrors.push('a lowercase letter');
      if (!/[0-9]/.test(password)) passErrors.push('a number');
      if (!/[-@$!%*?&#^()_+=]/.test(password)) passErrors.push('a special character');
        
      if (passErrors.length > 0) {
        let formattedErrors = '';
        if (passErrors.length === 1) {
          formattedErrors = passErrors[0];
        } else if (passErrors.length === 2) {
          formattedErrors = passErrors.join(' and ');
        } else {
          const last = passErrors.pop();
          formattedErrors = passErrors.join(', ') + ', and ' + last;
        }
        errors.password = 'Password must contain ' + formattedErrors + '.';
      }
    }

    // 2. Password Mismatch Validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    // Stop submission if there are validation errors
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await api.post('/auth/reset-password', { token, newPassword: password });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.error?.toLowerCase() || '';
      // Detect token issues from API response
      if (
        err.response?.status === 400 || 
        err.response?.status === 401 || 
        errorMsg.includes('token') || 
        errorMsg.includes('expire') || 
        errorMsg.includes('invalid')
      ) {
        setIsTokenInvalid(true);
      } else {
        setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
  };

  if (!token || isTokenInvalid) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <Card>
            <CardBody className="py-12 px-8 flex flex-col items-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
                <XCircle className="h-10 w-10 text-red-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                This password reset link is no longer valid, has expired, or has already been used. Please request a new link to continue.
              </p>
              <div className="w-full flex flex-col gap-4">
                <Link to="/forgot-password" className="w-full">
                  <Button className="w-full py-2.5 text-base">Request New Reset Link</Button>
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
          <p className="mt-2 text-gray-600">Enter your new password below.</p>
        </div>

        <Card>
          <CardBody>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
                {error}
              </div>
            )}
            
            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span className="font-medium">Success!</span>
                </div>
                <span className="ml-7">{message} Redirecting to login...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="New Password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                disabled={isLoading || !!message}
                error={fieldErrors.password}
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="••••••••"
                disabled={isLoading || !!message}
                error={fieldErrors.confirmPassword}
              />
              
              <Button type="submit" className="w-full mt-2" isLoading={isLoading} disabled={!!message}>
                Reset Password
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
