const fs = require('fs');

// 1. Update App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const importHome = "import { Home } from './pages/public/Home';";
const importAbout = "import { About } from './pages/public/About';\nimport { Home } from './pages/public/Home';";
appContent = appContent.replace(importHome, importAbout);

const routeHome = '<Route path="/" element={<Home />} />';
const routeAbout = '<Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />';
appContent = appContent.replace(routeHome, routeAbout);

fs.writeFileSync('src/App.jsx', appContent);

// 2. Update PublicLayout.jsx
let layoutContent = fs.readFileSync('src/layouts/PublicLayout.jsx', 'utf8');

layoutContent = layoutContent.replace('<Link to="/#about"', '<Link to="/about"');

fs.writeFileSync('src/layouts/PublicLayout.jsx', layoutContent);
console.log('App and Layout updated');
