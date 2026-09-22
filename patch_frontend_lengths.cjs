const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// 1. Replace Name validation
const nameOld = "if (!formData.name.trim()) errors.name = 'Full Name is required.';";
const nameNew = `if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Please enter a valid full name (minimum 3 characters).';
    }`;

if (content.includes(nameOld)) {
  content = content.replace(nameOld, nameNew);
  console.log('Replaced Name validation');
} else {
  console.log('Could not find Name validation');
}

// 2. Replace Company validation
const companyOld = `if (formData.role === 'recruiter' && (!formData.company_name || !formData.company_name.trim())) {
      errors.company_name = 'Company Name is required.';
    }`;
const companyNew = `if (formData.role === 'recruiter') {
      if (!formData.company_name || !formData.company_name.trim()) {
        errors.company_name = 'Company Name is required.';
      } else if (formData.company_name.trim().length < 2) {
        errors.company_name = 'Please enter a valid company name (minimum 2 characters).';
      }
    }`;

if (content.includes(companyOld)) {
  content = content.replace(companyOld, companyNew);
  console.log('Replaced Company validation');
} else {
  console.log('Could not find Company validation');
}

fs.writeFileSync(registerPath, content);
console.log('Done!');
