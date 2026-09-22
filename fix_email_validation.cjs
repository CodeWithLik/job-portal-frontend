const fs = require('fs');

// --- 1. Patch Register.jsx ---
let registerContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', 'utf8');

// Replace everything between `const email = formData.email.trim();` and `const pass = formData.password;`
const regRegex = /const email = formData\.email\.trim\(\);\s+if \(!email\) \{[\s\S]*?\}\s*const pass = formData\.password;/;

const regNewBlock = `const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email) || /\\.\\./.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    const pass = formData.password;`;

registerContent = registerContent.replace(regRegex, regNewBlock);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', registerContent);

// --- 2. Patch Contact.jsx ---
let contactContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

const conRegex = /const email = formData\.email\.trim\(\);\s+if \(!email\) \{[\s\S]*?\}\s+if \(!formData\.message\.trim\(\)\)/;

const conNewBlock = `const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email) || /\\.\\./.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message.trim())`;

contactContent = contactContent.replace(conRegex, conNewBlock);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', contactContent);

console.log('Fixed email validation properly.');
