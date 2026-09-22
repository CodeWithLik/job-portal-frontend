const fs = require('fs');

// 1. App.jsx - Add global ScrollToTop
let appContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\App.jsx', 'utf8');
if (!appContent.includes('ScrollToTop')) {
  appContent = appContent.replace(
    `import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';`,
    `import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';\nimport { ScrollToTop } from './components/common/ScrollToTop';`
  );
  appContent = appContent.replace(
    `<AuthProvider>`,
    `<AuthProvider>\n        <ScrollToTop />`
  );
  fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\App.jsx', appContent);
}

// 2. Navbar.jsx - Add onClick to Links
let navContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx', 'utf8');
navContent = navContent.replace(/<Link to="(.*?)"/g, '<Link to="$1" onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx', navContent);

// 3. PublicLayout.jsx (Footer) - Add onClick to Links
let footerContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', 'utf8');
footerContent = footerContent.replace(/<Link to="(.*?)"/g, '<Link to="$1" onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', footerContent);

console.log('Scroll to top behaviors injected successfully!');
