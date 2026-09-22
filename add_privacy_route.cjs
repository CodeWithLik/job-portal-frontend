const fs = require('fs');

// 1. Update App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

if (!appContent.includes('import { Privacy }')) {
  const importContact = "import { Contact } from './pages/public/Contact';";
  const importPrivacy = "import { Contact } from './pages/public/Contact';\nimport { Privacy } from './pages/public/Privacy';";
  appContent = appContent.replace(importContact, importPrivacy);
  
  const routeContact = '<Route path="/contact" element={<Contact />} />';
  const routePrivacy = '<Route path="/contact" element={<Contact />} />\n        <Route path="/privacy" element={<Privacy />} />';
  appContent = appContent.replace(routeContact, routePrivacy);
  
  fs.writeFileSync('src/App.jsx', appContent);
}

// 2. Update PublicLayout.jsx
let layoutContent = fs.readFileSync('src/layouts/PublicLayout.jsx', 'utf8');

layoutContent = layoutContent.replace('<Link to="/#privacy"', '<Link to="/privacy"');

fs.writeFileSync('src/layouts/PublicLayout.jsx', layoutContent);

console.log('Routing for Privacy added');
