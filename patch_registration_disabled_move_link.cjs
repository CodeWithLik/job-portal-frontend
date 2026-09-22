const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

const bannerStartStr = '{isRegistrationDisabled && (';
const bannerEndStr = '          {!isRegistrationDisabled && duplicateEmailError && (';

const bannerStartIdx = content.indexOf(bannerStartStr);
const bannerEndIdx = content.indexOf(bannerEndStr);

if (bannerStartIdx !== -1 && bannerEndIdx !== -1) {
  const bannerJSX = content.substring(bannerStartIdx, bannerEndIdx).trim();
  content = content.substring(0, bannerStartIdx) + content.substring(bannerEndIdx);
  
  // Find "<Link to="/login"" which is very unique
  const linkIdx = content.indexOf('<Link to="/login"');
  if (linkIdx !== -1) {
    // find the closing div after it
    const endDivIdx = content.indexOf('</div>', linkIdx);
    if (endDivIdx !== -1) {
      const insertPos = endDivIdx + 6; // 6 is length of </div>
      content = content.substring(0, insertPos) + '\n\n          ' + bannerJSX + '\n' + content.substring(insertPos);
      console.log("Successfully moved banner!");
    }
  }
}

fs.writeFileSync(registerPath, content);
