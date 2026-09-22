const fs = require('fs');

const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

// 1. Add isInvalidCreds to state
loginContent = loginContent.replace(
  "const [isSuspended, setIsSuspended] = useState(false);",
  "const [isSuspended, setIsSuspended] = useState(false);\n    const [isInvalidCreds, setIsInvalidCreds] = useState(false);"
);

// 2. Clear state in handleLogin setup
loginContent = loginContent.replace(
  "setIsSuspended(false);\n      setIsLoading(true);",
  "setIsSuspended(false);\n      setIsInvalidCreds(false);\n      setIsLoading(true);"
);

// 3. Update the catch block logic
const oldCatch = `} catch (err) {
        if (err.response?.status === 403 && err.response?.data?.message?.toLowerCase().includes('suspended')) {
          setError('Your account has been suspended');
          setIsSuspended(true);
        } else {
          setError(err.response?.data?.error || 'Failed to sign in. Please check your credentials.');
          setIsSuspended(false);
        }
      } finally {`;

const newCatch = `} catch (err) {
        if (err.response?.status === 403 && err.response?.data?.message?.toLowerCase().includes('suspended')) {
          setError('Your account has been suspended');
          setIsSuspended(true);
          setIsInvalidCreds(false);
        } else if (err.response?.status === 401 && err.response?.data?.error === 'Invalid credentials') {
          setError('Invalid email or password');
          setIsSuspended(false);
          setIsInvalidCreds(true);
        } else {
          setError(err.response?.data?.error || 'Failed to sign in. Please check your credentials.');
          setIsSuspended(false);
          setIsInvalidCreds(false);
        }
      } finally {`;

loginContent = loginContent.replace(oldCatch, newCatch);

// 4. Update clearError function
const oldClearError = `const clearError = () => {
      if (error) {
        setError('');
        setIsSuspended(false);
      }
    };`;

const newClearError = `const clearError = () => {
      if (error) {
        setError('');
        setIsSuspended(false);
        setIsInvalidCreds(false);
      }
    };`;

loginContent = loginContent.replace(oldClearError, newClearError);

// 5. Update the alert JSX
const oldAlert = `{error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-sm mb-6 flex items-start justify-between">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 m-0 p-0 leading-tight">{error}</h3>
                    {isSuspended && (
                      <div className="mt-1 text-red-700 m-0 p-0 leading-snug">
                        Please check your email for details on why this action was taken, or contact support for assistance.
                      </div>
                    )}
                  </div>
                </div>
                <button type="button" onClick={clearError} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-3">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}`;

const newAlert = `{error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-sm mb-6 flex items-start justify-between">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 m-0 p-0 leading-tight">{error}</h3>
                    {isSuspended && (
                      <div className="mt-1 text-red-700 m-0 p-0 leading-snug">
                        Please check your email for details on why this action was taken, or contact support for assistance.
                      </div>
                    )}
                    {isInvalidCreds && (
                      <div className="mt-1 text-red-700 m-0 p-0 leading-snug">
                        Please check your login details and try again, or use 'Forgot password?' below.
                      </div>
                    )}
                  </div>
                </div>
                <button type="button" onClick={clearError} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-3">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}`;

loginContent = loginContent.replace(oldAlert, newAlert);

fs.writeFileSync(loginPath, loginContent);
console.log('Fixed auth invalid credentials copy');
