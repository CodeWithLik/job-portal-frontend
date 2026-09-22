const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add shrink-0 to the parent div
content = content.replace(
  '<div className="flex flex-col items-end gap-1.5">',
  '<div className="flex flex-col items-end gap-1.5 shrink-0">'
);

// Add whitespace-nowrap to the p tag
content = content.replace(
  '<p className="text-xs text-gray-500 mt-3">Posted Date:',
  '<p className="text-xs text-gray-500 mt-3 whitespace-nowrap">Posted Date:'
);

fs.writeFileSync(path, content);
console.log('Fixed text wrapping for Posted Date');
