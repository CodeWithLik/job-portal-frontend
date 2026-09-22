const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import
if (!content.includes('import Logo from ')) {
  content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport Logo from './Logo';");
}

const searchRegex = /<div className="bg-blue-600 p-1\.5 rounded-lg">[\s\S]*?<Briefcase className="h-6 w-6 text-white" \/>[\s\S]*?<\/div>[\s\S]*?<span className="text-xl font-bold text-white tracking-tight">AI Job Portal<\/span>/;
const replaceStr = `<Logo size="md" isDark={true} />`;

if (searchRegex.test(content)) {
  content = content.replace(searchRegex, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated Footer.jsx logo');
} else {
  console.log('Could not find search string in Footer.jsx using regex');
}
