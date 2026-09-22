const fs = require('fs');
const path = require('path');

// 1. Update Register.jsx
const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
if (fs.existsSync(registerPath)) {
  let content = fs.readFileSync(registerPath, 'utf8');
  content = content.replace(
    "'Registration successful! Please log in.'",
    "'Registration successful! Please check your email to verify your account.'"
  );
  fs.writeFileSync(registerPath, content);
  console.log('Updated Register.jsx message');
}

// 2. Update App.jsx
const appPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src', 'App.jsx');
if (fs.existsSync(appPath)) {
  let content = fs.readFileSync(appPath, 'utf8');
  
  // Add import
  if (!content.includes('VerifyEmail')) {
    content = content.replace(
      "import { ResetPassword } from './pages/public/ResetPassword';",
      "import { ResetPassword } from './pages/public/ResetPassword';\nimport { VerifyEmail } from './pages/public/VerifyEmail';"
    );
    
    // Add Route
    content = content.replace(
      "<Route path=\"/reset-password\" element={<ResetPassword />} />",
      "<Route path=\"/reset-password\" element={<ResetPassword />} />\n            <Route path=\"/verify-email\" element={<VerifyEmail />} />"
    );
    
    fs.writeFileSync(appPath, content);
    console.log('Updated App.jsx with VerifyEmail route');
  }
}
