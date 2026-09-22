const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchRegex = /<div className="flex items-center gap-2">\s*<Logo size="md" isDark=\{true\} \/>\s*<\/div>/;

const replaceStr = `<div className="flex items-center gap-2">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-block transition-transform hover:opacity-90">
                  <Logo size="md" isDark={true} />
                </Link>
              </div>`;

if (searchRegex.test(content)) {
  content = content.replace(searchRegex, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully wrapped Footer logo in a Link');
} else {
  console.log('Could not find search string in Footer.jsx');
}
