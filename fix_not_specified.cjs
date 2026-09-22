const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');

const regex = /<span className="font-medium text-gray-500">Not specified<\/span>/g;
const replacement = '<span className="font-medium text-gray-900">Not specified</span>';

content = content.replace(regex, replacement);
fs.writeFileSync(usersPath, content);
console.log('Fixed Website Not specified styling');
