const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Register.jsx', 'utf8');

const oldTop = `              <p className="text-center text-sm text-gray-600 mb-4">
                Already have an account? <Link to={\`/login\${redirectUrl ? '?redirect=' + redirectUrl : ''}\`} className="font-medium text-blue-600 hover:text-blue-500">Log in</Link>
              </p>
            </div>
            
          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

const newTop = `              <p className="text-center text-sm text-gray-600 mb-4">
                Already have an account? <Link to={\`/login\${redirectUrl ? '?redirect=' + redirectUrl : ''}\`} className="font-medium text-blue-600 hover:text-blue-500">Log in</Link>
              </p>
            </div>
            
          {duplicateEmailError && (
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

if (content.includes(oldTop)) {
  content = content.replace(oldTop, newTop);
  console.log('Moved error blocks back to top (take 2).');
  fs.writeFileSync('src/pages/public/Register.jsx', content);
} else {
  console.log('Could not find oldTop block in take 2.');
}
