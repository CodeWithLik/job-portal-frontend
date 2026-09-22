const fs = require('fs');
const path = require('path');

function updateText(filePath, isRegister) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Change "Create an account" to "Create an Account" (Only in Register.jsx)
  if (isRegister) {
    content = content.replace(/>Create an account</g, '>Create an Account<');
  }

  // Change "or continue with email" to "or"
  content = content.replace(/>or continue with email</g, '>or<');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated text in ${filePath}`);
}

updateText(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'), true);
updateText(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'), false);
