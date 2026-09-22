const fs = require('fs');
const path = require('path');

const directory = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public';
const filesToUpdate = ['About.jsx', 'Contact.jsx', 'Privacy.jsx', 'Terms.jsx'];

filesToUpdate.forEach(file => {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The exact pattern might vary, so we'll use a regex to match the Link block
  // It usually looks like: <Link to="/" className="... mb-6 ..."> ... </Link>
  const linkRegex = /<Link to="\/"[^>]*>[\s\S]*?(?:← Back to Home|<ArrowLeft[^>]*>\s*Back to Home)[\s\S]*?<\/Link>/g;
  
  content = content.replace(linkRegex, '');
  
  // Also clean up any unused ArrowLeft import if it exists
  const arrowLeftImportRegex = /import\s+{[^}]*ArrowLeft[^}]*}\s+from\s+['"]lucide-react['"];?/g;
  content = content.replace(arrowLeftImportRegex, (match) => {
    // If it imports other things, keep them
    if (match.includes(',')) {
      return match.replace(/\bArrowLeft\b\s*,?/, '').replace(/,\s*}/, '}');
    }
    return '';
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
