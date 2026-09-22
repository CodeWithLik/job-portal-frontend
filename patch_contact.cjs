const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace placeholder
content = content.replace(
  'placeholder="e.g., Likanos Tegene"',
  'placeholder="John Doe"'
);

// 2. Replace validation
content = content.replace(
  "if (!formData.name.trim()) errors.name = 'Full Name is required.';",
  "if (!formData.name.trim() || formData.name.trim().length < 3) errors.name = 'Please enter a valid full name (minimum 3 characters).';"
);

fs.writeFileSync(path, content);
console.log('Successfully updated Contact.jsx placeholder and validation.');
