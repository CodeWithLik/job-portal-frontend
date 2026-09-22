const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `    const errors = {};
    if (!newUser.name.trim()) errors.name = 'Full Name is required.';`;

const replaceStr = `    const errors = {};
    if (!newUser.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (newUser.name.trim().length < 3) {
      errors.name = 'Please enter a valid full name (minimum 3 characters).';
    }`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully patched Users.jsx name validation');
} else {
  console.log('Could not find search string in Users.jsx');
}
