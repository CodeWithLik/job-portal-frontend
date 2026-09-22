const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// I know exactly where to insert it: right before the duplicateEmailError check
// We want it directly below the "Already have an account? Log In" text which is inside a div.
// Wait, the duplicate email check is at the top of the form area. Let's just put it right above that.

const insertStr = '{!isRegistrationDisabled && duplicateEmailError && (';
const insertIdx = content.indexOf(insertStr);

if (insertIdx !== -1) {
  const bannerJSX = `{isRegistrationDisabled && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{disabledMessage}</p>
                </div>
              </div>
            </div>
          )}

          `;
          
  content = content.substring(0, insertIdx) + bannerJSX + content.substring(insertIdx);
  console.log("Successfully re-inserted the banner!");
} else {
  console.log("Could not find insert point.");
}

fs.writeFileSync(registerPath, content);
