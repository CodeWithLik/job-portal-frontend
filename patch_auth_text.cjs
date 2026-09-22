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

// 1. Update Navbar
replaceFileContent(
  path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common', 'Navbar.jsx'),
  [
    { find: '>Login<', replace: '>Log In<' }
  ]
);

// 2. Update Login.jsx
replaceFileContent(
  path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'),
  [
    { find: '>Sign in<', replace: '>Log In<' },
    { find: 'Or <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">create a new account</Link>', replace: 'Don\'t have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>' },
    { find: "'Signing in...'", replace: "'Logging in...'" },
    { find: "'Sign in'", replace: "'Log In'" },
    { find: "'Failed to sign in.", replace: "'Failed to log in." }
  ]
);

// 3. Update Register.jsx
replaceFileContent(
  path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'),
  [
    { find: '>Log in<', replace: '>Log In<' },
    { find: 'Please log in.', replace: 'Please log in.' } // keep lowercase for sentence
  ]
);
