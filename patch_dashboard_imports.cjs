const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const importStr = "import { Users, Briefcase, TrendingUp, Loader2, X } from 'lucide-react';";
const newImportStr = "import { Users, Briefcase, TrendingUp, Loader2, X, PlusCircle } from 'lucide-react';";

if (content.includes(importStr)) {
  content = content.replace(importStr, newImportStr);
  fs.writeFileSync(path, content);
  console.log('Successfully added PlusCircle to imports');
} else {
  console.log('Could not find import string in Dashboard.jsx');
}
