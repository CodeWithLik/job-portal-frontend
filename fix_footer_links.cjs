const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', 'utf8');

content = content.replace(
  '<Link to="/#privacy" className="hover:text-white transition-colors">Privacy</Link>',
  '<Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>'
);

content = content.replace(
  '<Link to="/#terms" className="hover:text-white transition-colors">Terms</Link>',
  '<Link to="/terms" className="hover:text-white transition-colors">Terms</Link>'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', content);
console.log('Footer links connected');
