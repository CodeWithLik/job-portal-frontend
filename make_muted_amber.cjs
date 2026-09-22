const fs = require('fs');

const files = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Badge.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace the bright amber with a softer, muted amber/sand with a subtle border
  content = content.replace(/bg-amber-100 text-amber-800/g, 'bg-amber-50 text-amber-700 border border-amber-200/60');
  fs.writeFileSync(file, content);
});

console.log('Updated to a softer, muted amber/bronze color.');
