const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

const badEffect = `  // Always get fresh settings when visiting this page or focusing the browser tab
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

const goodEffect = `  // Always get fresh settings when visiting this page or focusing the browser tab
  useEffect(() => {
    if (fetchSystemSettings) {
      fetchSystemSettings();
    }
    
    const handleFocus = () => {
      if (fetchSystemSettings) fetchSystemSettings();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []); // Empty dependency array to prevent infinite loop`;

if (content.includes(badEffect)) {
  content = content.replace(badEffect, goodEffect);
  fs.writeFileSync(registerPath, content);
  console.log("Fixed infinite loop in Register.jsx!");
} else {
  console.log("Could not find the bad useEffect block.");
}
