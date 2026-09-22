const fs = require('fs');

let content = fs.readFileSync('src/pages/public/Login.jsx', 'utf8');

const loginErrorBlock = `          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6 flex items-start justify-between">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
              <button type="button" onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin} noValidate>`;

const loginNewFormStart = `          <form className="space-y-5" onSubmit={handleLogin} noValidate>`;

const loginSubmitButtonTarget = `            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>`;

const loginNewSubmitButtonTarget = `            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>`;


if (content.includes(loginErrorBlock) && content.includes(loginSubmitButtonTarget)) {
  content = content.replace(loginErrorBlock, loginNewFormStart);
  content = content.replace(loginSubmitButtonTarget, loginNewSubmitButtonTarget);
  fs.writeFileSync('src/pages/public/Login.jsx', content);
  console.log("Successfully moved error alert in Login!");
} else {
  console.log("Failed to find exact strings in Login.");
}
