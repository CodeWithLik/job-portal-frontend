const fs = require('fs');
let navContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx', 'utf8');

navContent = navContent.replace(/<Link to=\{`([^`]+)`\}\s+className/g, '<Link to={`$1`} onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })} className');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx', navContent);
console.log('Fixed Navbar JSX links');
