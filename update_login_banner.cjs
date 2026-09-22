const fs = require('fs');

const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

// 1. Remove adminEmail state and add isSuspended
loginContent = loginContent.replace(
  "const [error, setError] = useState('');\n  const [adminEmail, setAdminEmail] = useState('');",
  "const [error, setError] = useState('');\n  const [isSuspended, setIsSuspended] = useState(false);"
);

// 2. Update handleLogin reset
loginContent = loginContent.replace(
  "setError('');\n    setAdminEmail('');",
  "setError('');\n    setIsSuspended(false);"
);

// 3. Update catch block
const oldCatch = `} catch (err) {
      if (err.response?.status === 403 && err.response?.data?.message) {
        setError(err.response.data.message);
        setAdminEmail(err.response.data.adminEmail || '');
      } else {
        setError(err.response?.data?.error || 'Failed to sign in. Please check your credentials.');
        setAdminEmail('');
      }
    }`;

const newCatch = `} catch (err) {
      if (err.response?.status === 403 && err.response?.data?.message?.toLowerCase().includes('suspended')) {
        setError('Your account has been suspended');
        setIsSuspended(true);
      } else {
        setError(err.response?.data?.error || 'Failed to sign in. Please check your credentials.');
        setIsSuspended(false);
      }
    }`;

loginContent = loginContent.replace(oldCatch, newCatch);

// 4. Update clearError
const oldClearError = `const clearError = () => {
    if (error) {
      setError('');
      setAdminEmail('');
    }
  };`;

const newClearError = `const clearError = () => {
    if (error) {
      setError('');
      setIsSuspended(false);
    }
  };`;

loginContent = loginContent.replace(oldClearError, newClearError);

// 5. Update Alert HTML
const oldAlert = `{error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6 flex items-start justify-between">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{error}</p>
                  {adminEmail && (
                    <p className="mt-1 text-red-600">
                      Please contact <a href={\`mailto:\${adminEmail}\`} className="underline font-semibold hover:text-red-900">{adminEmail}</a> for assistance.
                    </p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}`;

const newAlert = `{error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm mb-6 flex items-start justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <p className="font-bold text-red-800">{error}</p>
                  {isSuspended && (
                    <p className="mt-1 text-red-700">
                      Please check your email for details on why this action was taken, or contact support for assistance.
                    </p>
                  )}
                </div>
              </div>
              <button type="button" onClick={clearError} className="text-red-400 hover:text-red-600 ml-3">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}`;

loginContent = loginContent.replace(oldAlert, newAlert);

fs.writeFileSync(loginPath, loginContent);
console.log('Updated Login.jsx with new suspended banner');
