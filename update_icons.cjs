const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Home.jsx', 'utf8');

// Replace import
content = content.replace(
  "import { Briefcase, Brain, Users, ClipboardList } from 'lucide-react';",
  "import { Briefcase, Brain, LayoutDashboard } from 'lucide-react';"
);

// Replace icons in cards
content = content.replace('<Users />', '<Briefcase />');
content = content.replace('<ClipboardList />', '<LayoutDashboard />');

fs.writeFileSync('src/pages/public/Home.jsx', content);
console.log('Icons updated successfully');
