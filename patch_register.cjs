const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(path, 'utf8');

// Step 1: get systemSettings from useAuth
content = content.replace(
  'const { register } = useAuth();',
  'const { register, systemSettings } = useAuth();'
);

// Step 2: Determine if registration is disabled
content = content.replace(
  'const [isLoading, setIsLoading] = useState(false);',
  `const [isLoading, setIsLoading] = useState(false);

  const isRegistrationDisabled = formData.role === 'seeker' 
    ? systemSettings?.allow_user_registration === false 
    : systemSettings?.allow_recruiter_registration === false;
  
  const disabledMessage = formData.role === 'seeker' 
    ? "Seeker registration is currently disabled by the administration."
    : "Recruiter registration is currently disabled by the administration.";`
);

// Step 3: Replace the error alert rendering block
const oldErrorRender = `          {duplicateEmailError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    An account with this email already exists. 
                    <Link to="/login" className="underline font-semibold hover:text-rose-900 ml-1">Log in</Link>
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-rose-400 hover:text-rose-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}`;

const newErrorRender = `          {isRegistrationDisabled && (
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
                    <Link to="/login" className="underline font-semibold hover:text-rose-900 ml-1">Log in</Link>
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
          )}`;

content = content.replace(oldErrorRender, newErrorRender);

// Step 4: Disable inputs
content = content.replace(
  'const handleRegister = async (e) => {',
  `const handleRegister = async (e) => {
    if (isRegistrationDisabled) return;`
);

content = content.replace(
  /disabled={isLoading}/g,
  'disabled={isLoading || isRegistrationDisabled}'
);

// Now apply disable to each specific input
// We can use a regex to inject `disabled={isRegistrationDisabled}` into all `<Input ... />` tags
content = content.replace(
  /<Input\s+wrapperClassName/g,
  '<Input disabled={isRegistrationDisabled} wrapperClassName'
);

content = content.replace(
  'id="acceptTerms"',
  'id="acceptTerms" disabled={isRegistrationDisabled}'
);

content = content.replace(
  'onClick={handleGoogleAuth}',
  'onClick={handleGoogleAuth} disabled={isLoading || isRegistrationDisabled}'
);

// We should also clear any errors when toggling roles
content = content.replace(
  `const handleRoleToggle = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };`,
  `const handleRoleToggle = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setError('');
    setDuplicateEmailError(false);
  };`
);

fs.writeFileSync(path, content);
console.log('Successfully updated Register.jsx');
