const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx', 'utf8');

content = content.replace(
  '<a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">',
  '<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">'
);

content = content.replace(
  '<a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">',
  '<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">'
);

content = content.replace(
  '<a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">',
  '<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx', content);
console.log('Added target="_blank" to social links in Footer.jsx');
