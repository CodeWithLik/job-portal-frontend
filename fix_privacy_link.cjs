const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', 'utf8');

content = content.replace(
  '<Link to="/contact" className="text-blue-600 font-semibold hover:underline">Contact Support</Link>',
  '<Link to="/contact" className="text-blue-600 font-semibold hover:underline whitespace-nowrap inline-block">Contact Support</Link>'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', content);
console.log('Fixed Contact Support wrap');
