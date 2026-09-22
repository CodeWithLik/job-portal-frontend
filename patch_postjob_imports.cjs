const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\PostJob.jsx';
let content = fs.readFileSync(path, 'utf8');

const importRegex = /import {([^}]+)} from 'lucide-react';/;
const match = content.match(importRegex);

if (match) {
  const currentImports = match[1];
  if (!currentImports.includes('AlertTriangle')) {
    const newImports = `import {${currentImports}, AlertTriangle} from 'lucide-react';`;
    content = content.replace(match[0], newImports);
    fs.writeFileSync(path, content);
    console.log('Added AlertTriangle to imports');
  } else {
    console.log('AlertTriangle already imported');
  }
} else {
  console.log('Could not find lucide-react imports');
}
