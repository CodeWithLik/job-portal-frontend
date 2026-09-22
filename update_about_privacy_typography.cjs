const fs = require('fs');

// 1. Update About.jsx
let aboutContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');
aboutContent = aboutContent.replace(
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">',
  '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24 text-pretty">'
);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', aboutContent);

// 2. Update Privacy.jsx
let privacyContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', 'utf8');
privacyContent = privacyContent.replace(
  'leading-relaxed">',
  'leading-relaxed text-pretty">'
);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', privacyContent);

console.log('Applied text-pretty to About and Privacy.');
