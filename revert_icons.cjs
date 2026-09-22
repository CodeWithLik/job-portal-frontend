const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Home.jsx', 'utf8');

// Replace import
content = content.replace(
  "import { Briefcase, Brain, LayoutDashboard } from 'lucide-react';",
  "import { Briefcase, Brain, Users, ClipboardList } from 'lucide-react';"
);

// Replace icons in cards
content = content.replace('<Briefcase /></div>', '<Users /></div>');
content = content.replace('<LayoutDashboard /></div>', '<ClipboardList /></div>');

fs.writeFileSync('src/pages/public/Home.jsx', content);
console.log('Icons reverted successfully');
