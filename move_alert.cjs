const fs = require('fs');

let content = fs.readFileSync('src/pages/public/Register.jsx', 'utf8');

const errorsBlock = `          {duplicateEmailError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between">
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

const newFormStart = `          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

const submitButtonTarget = `            <Button type="submit" className="w-full mt-1" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>`;

const newSubmitButtonTarget = `            {duplicateEmailError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-1" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>`;

if (content.includes(errorsBlock) && content.includes(submitButtonTarget)) {
  content = content.replace(errorsBlock, newFormStart);
  content = content.replace(submitButtonTarget, newSubmitButtonTarget);
  fs.writeFileSync('src/pages/public/Register.jsx', content);
  console.log("Successfully moved error alerts!");
} else {
  console.log("Failed to find exact strings.");
  if (!content.includes(errorsBlock)) console.log("Missing errorsBlock");
  if (!content.includes(submitButtonTarget)) console.log("Missing submitButtonTarget");
}
