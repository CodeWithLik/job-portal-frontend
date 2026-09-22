const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', 'utf8');

// Change text-left to text-center for the header text container
content = content.replace(
  '<div className="text-left">',
  '<div className="text-center">'
);

// We should also adjust max-w-4xl to max-w-6xl on the header if we want it to exactly match Contact's width,
// but the prompt just says center align. I will center it.

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', content);
console.log('Privacy Policy header centered.');
