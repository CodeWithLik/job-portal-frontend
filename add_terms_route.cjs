const fs = require('fs');

// 1. Update App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

if (!appContent.includes('import { Terms }')) {
  const importPrivacy = "import { Privacy } from './pages/public/Privacy';";
  const importTerms = "import { Privacy } from './pages/public/Privacy';\nimport { Terms } from './pages/public/Terms';";
  appContent = appContent.replace(importPrivacy, importTerms);
  
  const routePrivacy = '<Route path="/privacy" element={<Privacy />} />';
  const routeTerms = '<Route path="/privacy" element={<Privacy />} />\n        <Route path="/terms" element={<Terms />} />';
  appContent = appContent.replace(routePrivacy, routeTerms);
  
  fs.writeFileSync('src/App.jsx', appContent);
}

// 2. Update PublicLayout.jsx
let layoutContent = fs.readFileSync('src/layouts/PublicLayout.jsx', 'utf8');
layoutContent = layoutContent.replace('<Link to="/#terms"', '<Link to="/terms"');
fs.writeFileSync('src/layouts/PublicLayout.jsx', layoutContent);

console.log('Terms route added');
