const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required.';`;

const replaceStr = `    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Please enter a valid full name (minimum 3 characters).';
    }`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated Register.jsx name validation');
} else {
  console.log('Could not find validation block in Register.jsx');
}
