const fs = require('fs');

const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(registerPath, 'utf8');

const regexDuplicate = /\{\s*duplicateEmailError\s*&&\s*\([\s\S]*?\}\s*\)\s*\}/;

const newDuplicateAlert = `{duplicateEmailError && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-sm mb-6 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 m-0 p-0 leading-tight">An account with this email already exists.</h3>
                    <div className="mt-1 m-0 p-0 leading-snug">
                      <Link to="/login" className="text-red-700 font-medium hover:text-red-900 underline underline-offset-2">Log in to your account →</Link>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-3">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}`;

content = content.replace(regexDuplicate, newDuplicateAlert);
fs.writeFileSync(registerPath, content);
console.log('Fixed duplicate email block via regex');
