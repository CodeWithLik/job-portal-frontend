const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// 1. Add fetchSystemSettings to useAuth
const oldAuth = 'const { register, systemSettings } = useAuth();';
const newAuth = 'const { register, systemSettings, fetchSystemSettings } = useAuth();';

if (content.includes(oldAuth)) {
  content = content.replace(oldAuth, newAuth);
} else {
  console.log("Could not find useAuth declaration.");
}

// 2. Add the useEffect block
const oldEffect = `  // Intercept Google OAuth callback token
  useEffect(() => {
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.location.href = redirectUrl || '/';
    }
  }, [urlToken, redirectUrl]);`;

const newEffect = `  // Intercept Google OAuth callback token
  useEffect(() => {
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.location.href = redirectUrl || '/';
    }
  }, [urlToken, redirectUrl]);

  // Always get fresh settings when visiting this page or focusing the browser tab
  useEffect(() => {
    if (fetchSystemSettings) {
      fetchSystemSettings();
    }
    
    const handleFocus = () => {
      if (fetchSystemSettings) fetchSystemSettings();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchSystemSettings]);`;

if (content.includes(oldEffect)) {
  content = content.replace(oldEffect, newEffect);
  console.log("Added fetchSystemSettings useEffect successfully.");
} else {
  console.log("Could not find old useEffect block.");
}

fs.writeFileSync(registerPath, content);
console.log('Register.jsx patched with live reload.');
