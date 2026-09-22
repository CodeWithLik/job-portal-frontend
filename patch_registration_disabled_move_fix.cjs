const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// The banner starts with:
const bannerStartStr = '{isRegistrationDisabled && (';
const bannerEndStr = '          {!isRegistrationDisabled && duplicateEmailError && (';

const bannerStartIdx = content.indexOf(bannerStartStr);
const bannerEndIdx = content.indexOf(bannerEndStr);

if (bannerStartIdx !== -1 && bannerEndIdx !== -1) {
  // Extract the banner (trim whitespace)
  const bannerJSX = content.substring(bannerStartIdx, bannerEndIdx).trim();
  
  // Remove it from current pos
  content = content.substring(0, bannerStartIdx) + content.substring(bannerEndIdx);
  
  // Find the exact header
  const headerEndStr = '              </p>\n            </div>';
  const headerIdx = content.indexOf(headerEndStr);
  
  if (headerIdx !== -1) {
    const insertPos = headerIdx + headerEndStr.length;
    
    // Insert!
    content = content.substring(0, insertPos) + '\n\n          ' + bannerJSX + '\n' + content.substring(insertPos);
    console.log("Successfully moved banner.");
  } else {
    console.log("Could not find header.");
  }
} else {
  console.log("Could not find banner.", bannerStartIdx, bannerEndIdx);
}

fs.writeFileSync(registerPath, content);
