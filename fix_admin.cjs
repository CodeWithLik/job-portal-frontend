const fs = require('fs');
const files = [
  'src/pages/admin/Activity.jsx',
  'src/pages/admin/Applications.jsx',
  'src/pages/admin/Settings.jsx',
  'src/pages/admin/Users.jsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  console.log('--- ' + f);
  const match = content.match(/if\s*\(\s*loading\s*\)\s*\{?\s*return\s*<div[^>]*>[\s\S]*?<Loader2[^>]*>[\s\S]*?<\/div>\s*;?\s*\}?/);
  if (match) {
    console.log('Matched early return!');
    content = content.replace(match[0], '');
    fs.writeFileSync(f, content);
  } else if (f.includes('Users.jsx')) {
    const newContent = content.replace(/loading\s*\?\s*\(\s*<div className="p-8 text-center">[\s\S]*?<\/div>\s*\)\s*:\s*\(\s*(<div className="overflow-x-auto">)/, '');
    if (newContent !== content) {
      console.log('Matched Users ternary!');
      // Wait, since I replaced loading ? ( ... ) : ( <div...>, there's a trailing ) at the end of the block.
      // The easiest way is to replace loading ? (...) : (...) entirely. Let me use a more precise regex.
      let fixed = content.replace(/loading\s*\?\s*\(\s*<div className="p-8 text-center">[\s\S]*?<\/div>\s*\)\s*:\s*\(/, '');
      // Then I need to find the matching closing parenthesis. Actually, JSX allows omitting the parentheses.
      // Let's just do it manually for Users.jsx if this fails.
      fs.writeFileSync(f, fixed);
    } else {
      console.log('Users ternary NOT MATCHED');
    }
  } else {
    console.log('No match for ' + f);
  }
});
