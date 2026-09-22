const fs = require('fs');

const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

// The block to remove is:
const blockToRemove = `{isInvalidCreds && (
                      <div className="mt-1 text-red-700 m-0 p-0 leading-snug">
                        Please check your login details and try again, or use 'Forgot password?' below.
                      </div>
                    )}`;

loginContent = loginContent.replace(blockToRemove, '');

fs.writeFileSync(loginPath, loginContent);
console.log('Removed multiline description for invalid credentials, reverting to single line');
