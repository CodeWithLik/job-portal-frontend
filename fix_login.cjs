const fs = require('fs');
const path = 'src/pages/public/Login.jsx';
let content = fs.readFileSync(path, 'utf8');

// The file currently has literal backslash-backticks because of string escaping
content = content.replace(/navigate\(\\\`\/\\\$\\{user\.role\\}\/dashboard\\\`\);/g, "navigate(`/${user.role}/dashboard`);");

// Let's just be more robust:
content = content.split('\\`').join('`');
content = content.split('\\$').join('$');

fs.writeFileSync(path, content);
console.log("Fixed Login.jsx syntax");
