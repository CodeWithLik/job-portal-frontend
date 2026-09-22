const fs = require('fs');
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';
let content = fs.readFileSync(appsPath, 'utf8');

// Change space-y-4 to space-y-6 to add more space between sections
content = content.replace(
  '<div className="space-y-4">',
  '<div className="space-y-6">'
);

// Increase vertical padding inside the grid to push the text down a bit from the top edge
content = content.replace(
  '<div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">',
  '<div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 py-5 px-4 rounded-xl border border-gray-100 mt-2">'
);

fs.writeFileSync(appsPath, content);
console.log('Fixed application modal spacing to be lower');
