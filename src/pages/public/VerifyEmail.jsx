import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody } from '../../components/common/Card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    const verify = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://job-portal-backend-bx41.onrender.com/api';
        const res = await axios.post(`${apiUrl}/auth/verify-email`, { token });
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully.');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed. The link may have expired.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full mx-auto shadow-sm">
        <CardBody className="p-8 text-center flex flex-col items-center">
          
          {status === 'verifying' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email...</h2>
              <p className="text-gray-500">Please wait while we verify your account.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link to="/login" className="w-full">
                <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Go to Log In
                </button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-rose-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Return to Log In
              </Link>
            </>
          )}

        </CardBody>
      </Card>
    </div>
  );
};
