const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import
if (!content.includes('import Logo from ')) {
  content = content.replace("import { Link, useNavigate } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';\nimport Logo from './Logo';");
}

// 2. Replace old logo HTML
const searchStr = `<Briefcase className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">AI Job Portal</span>`;
                
const replaceStr = `<Logo size="md" />`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated Navbar.jsx logo');
} else {
  console.log('Could not find search string in Navbar.jsx');
}
