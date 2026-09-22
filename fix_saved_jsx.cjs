const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the ternary branch start
content = content.replace(
  ') : savedJobs.length > 0 ? (\n        <div className="space-y-4">',
  ') : savedJobs.length > 0 ? (\n        <div className="flex flex-col w-full">\n          <div className="space-y-4">'
);

// Find the end of the Pagination Footer block and close the div
const footerRegex = /(<\/div>\s*)\)\s*:\s*\(\s*<Card>/;
content = content.replace(footerRegex, '$1\n        </div>\n      ) : (\n        <Card>');

fs.writeFileSync(path, content);
console.log('Fixed JSX syntax in SavedJobs.jsx');
