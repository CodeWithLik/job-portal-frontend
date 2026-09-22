const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// Use regex to match the entire validateForm block dynamically
const validateFormRegex = /const validateForm = \(\) => \{[\s\S]*?return Object\.keys\(errors\)\.length === 0;\n  \};/;

const newValidateForm = `const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else {
      const emailRegex = /^[^\\s@\\/]+@[^\\s@\\/]+\\.[^\\s@\\/]{2,}$/;
      if (/\\s/.test(formData.email) || /\\.\\./.test(formData.email) || /\\/\\//.test(formData.email) || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else {
      const missing = [];
      if (formData.password.length < 8) missing.push('8 characters');
      if (!/[A-Z]/.test(formData.password)) missing.push('an uppercase letter');
      if (!/[0-9]/.test(formData.password)) missing.push('a number');
      if (!/[^A-Za-z0-9]/.test(formData.password)) missing.push('a special character');

      if (missing.length === 1) {
        errors.password = \`Password must contain at least \${missing[0].replace('an uppercase', 'one uppercase').replace('a special', 'one special').replace('a number', 'one number')}.\`;
      } else if (missing.length > 1) {
        if (missing.length === 4) {
          errors.password = 'Password must contain at least 8 characters, an uppercase letter, a number, and a special character.';
        } else {
          const last = missing.pop();
          errors.password = \`Password must contain at least \${missing.join(', ')}, and \${last}.\`;
        }
      }
    }
    
    if (formData.role === 'recruiter' && (!formData.company_name || !formData.company_name.trim())) {
      errors.company_name = 'Company Name is required.';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must agree to the Terms of Service and Privacy Policy to register.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };`;

content = content.replace(validateFormRegex, newValidateForm);

fs.writeFileSync(registerPath, content);
console.log('Register.jsx validateForm patched successfully.');
