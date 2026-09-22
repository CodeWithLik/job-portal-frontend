const fs = require('fs');
let footerContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', 'utf8');

// Replace <Link to={...} className=...
// with <Link to={...} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className=...
footerContent = footerContent.replace(/<Link to=\{([^}]+)\}\s+className/g, '<Link to={$1} onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })} className');

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', footerContent);
console.log('Fixed remaining JSX links in PublicLayout.jsx');
