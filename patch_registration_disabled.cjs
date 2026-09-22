const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// 1. Fix the variable logic and text
const oldLogic = `  // Check if registration for the selected role is disabled
  const isRegistrationDisabled = formData.role === 'seeker' 
    ? systemSettings?.allow_seeker_registration === false 
    : systemSettings?.allow_recruiter_registration === false;
  
  const disabledMessage = formData.role === 'seeker' 
    ? "Seeker registration is currently disabled by the administration."
    : "Recruiter registration is currently disabled by the administration.";`;

const newLogic = `  // Check if registration for the selected role is disabled
  const isRegistrationDisabled = formData.role === 'seeker' 
    ? systemSettings?.allow_user_registration === false 
    : systemSettings?.allow_recruiter_registration === false;
  
  const disabledMessage = formData.role === 'seeker' 
    ? "Seeker registration is currently disabled by administration."
    : "Recruiter registration is currently disabled by administration.";`;

content = content.replace(oldLogic, newLogic);

// 2. Move the Banner JSX
// First, extract the banner JSX
const bannerStartIdx = content.indexOf('{isRegistrationDisabled && (');
const bannerEndStr = '          {!isRegistrationDisabled && duplicateEmailError && (';
const bannerEndIdx = content.indexOf(bannerEndStr);

if (bannerStartIdx !== -1 && bannerEndIdx !== -1) {
  const bannerJSX = content.substring(bannerStartIdx, bannerEndIdx);
  
  // Remove it from its current position
  content = content.substring(0, bannerStartIdx) + content.substring(bannerEndIdx);
  
  // Find the header to insert it after
  const headerStr = `            <p className="text-gray-600 mt-2 text-sm">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
            </p>
          </div>`;
  const insertPos = content.indexOf(headerStr) + headerStr.length;
  
  // Insert the banner
  content = content.substring(0, insertPos) + '\n\n          ' + bannerJSX.trim() + '\n' + content.substring(insertPos);
}

fs.writeFileSync(registerPath, content);
console.log('Register.jsx layout and settings patched successfully.');
