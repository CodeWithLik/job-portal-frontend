const fs = require('fs');

const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(registerPath, 'utf8');

// Regex to remove the frontend validation scroll
const scrollRegex = /if\s*\(formTopRef\.current\)\s*\{\s*formTopRef\.current\.scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\);\s*\}/;

content = content.replace(scrollRegex, '');

fs.writeFileSync(registerPath, content);
console.log('Removed scrollIntoView via regex');
