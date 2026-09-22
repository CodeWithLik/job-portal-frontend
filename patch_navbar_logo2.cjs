const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchRegex = /<Briefcase className="h-8 w-8 text-blue-600" \/>[\s\S]*?<span className="font-bold text-xl text-gray-900">AI Job Portal<\/span>/;
const replaceStr = `<Logo size="md" />`;

if (searchRegex.test(content)) {
  content = content.replace(searchRegex, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated Navbar.jsx logo (regex)');
} else {
  console.log('Could not find search string in Navbar.jsx using regex');
}
