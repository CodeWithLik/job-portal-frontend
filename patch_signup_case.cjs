const fs = require('fs');
const path = require('path');

function replaceFileContent(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ find, replace }) => {
    content = content.split(find).join(replace);
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

// Update Login.jsx
replaceFileContent(
  path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'),
  [
    { find: '>Sign up<', replace: '>Sign Up<' }
  ]
);

// Update Register.jsx
replaceFileContent(
  path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'),
  [
    { find: "'Sign up'", replace: "'Sign Up'" },
    { find: ">Sign up<", replace: ">Sign Up<" } // just in case it's hardcoded somewhere else
  ]
);
