const fs = require('fs');
const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

loginContent = loginContent.replace(
  '<div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">',
  '<div className="min-h-[calc(100vh-10rem)] flex items-start justify-center bg-gray-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8">'
);

fs.writeFileSync(loginPath, loginContent);
console.log('Fixed Login vertical layout spacing');
