const fs = require('fs');

const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const oldAlert = `{error && (
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
                  </div>
                </div>
                <button type="button" onClick={clearError} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-3">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}`;

loginContent = loginContent.replace(oldAlert, newAlert);

fs.writeFileSync(loginPath, loginContent);
console.log('Fixed banner alignment');
