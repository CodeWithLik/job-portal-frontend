const fs = require('fs');
const path = require('path');

const loginPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx');
let content = fs.readFileSync(loginPath, 'utf8');

// The banner currently is: {successMessage && !error && (
content = content.replace('{successMessage && !error && (', '{successMessage && (');

fs.writeFileSync(loginPath, content);
console.log("Patched Login.jsx success banner");
