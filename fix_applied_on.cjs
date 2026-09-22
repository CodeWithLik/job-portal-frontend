const fs = require('fs');
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';
let content = fs.readFileSync(appsPath, 'utf8');

content = content.replace(
  '<p className="text-xs text-gray-500 mt-2 whitespace-nowrap">Applied: <span className="font-semibold text-gray-700">{formatDate(selectedApp.applied_at)}</span></p>',
  '<p className="text-xs text-gray-500 mt-2 whitespace-nowrap">Applied on: <span className="font-semibold text-gray-700">{formatDate(selectedApp.applied_at)}</span></p>'
);

fs.writeFileSync(appsPath, content);
console.log('Changed Applied: to Applied on:');
