const fs = require('fs');

// 1. Update App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const importAbout = "import { About } from './pages/public/About';";
const importContact = "import { Contact } from './pages/public/Contact';\nimport { About } from './pages/public/About';";
appContent = appContent.replace(importAbout, importContact);

const routeAbout = '<Route path="/about" element={<About />} />';
const routeContact = '<Route path="/about" element={<About />} />\n        <Route path="/contact" element={<Contact />} />';
appContent = appContent.replace(routeAbout, routeContact);

fs.writeFileSync('src/App.jsx', appContent);

// 2. Update PublicLayout.jsx
let layoutContent = fs.readFileSync('src/layouts/PublicLayout.jsx', 'utf8');

layoutContent = layoutContent.replace('<Link to="/#contact"', '<Link to="/contact"');

fs.writeFileSync('src/layouts/PublicLayout.jsx', layoutContent);
console.log('App and Layout updated for Contact');
