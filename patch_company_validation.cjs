const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `    if (formData.role === 'recruiter' && !formData.company_name?.trim()) errors.company_name = 'Company name is required.';`;

const replaceStr = `    if (formData.role === 'recruiter') {
      if (!formData.company_name?.trim()) {
        errors.company_name = 'Company name is required.';
      } else if (formData.company_name.trim().length < 2) {
        errors.company_name = 'Please enter a valid company name (minimum 2 characters).';
      }
    }`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully patched company validation in Register.jsx');
} else {
  console.log('Could not find search string in Register.jsx');
}
