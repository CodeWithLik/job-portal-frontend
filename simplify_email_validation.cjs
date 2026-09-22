const fs = require('fs');

// --- 1. Patch Register.jsx ---
let registerContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', 'utf8');

const regOldEmailBlock = `      if (!email) {
        errors.email = 'Email is required.';
      } else {
        if (/\\s/.test(email)) errors.email = 'Email must not contain whitespace.';
        else if ((email.match(/@/g) || []).length !== 1) errors.email = 'Email must contain exactly one @ symbol.';
        else if (/\\.\\./.test(email)) errors.email = 'Email must not contain consecutive dots.';
        else if (!/^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/.test(email)) errors.email = 'Email must have a valid local part, domain, and top-level domain (at least 2 letters).';
      }`;

const regNewEmailBlock = `      if (!email) {
        errors.email = 'Email is required.';
      } else if (!email.includes('@')) {
        errors.email = "Please include an '@' in the email address.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email) || /\\.\\./.test(email)) {
        errors.email = 'Please enter a valid email address.';
      }`;

registerContent = registerContent.replace(regOldEmailBlock, regNewEmailBlock);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', registerContent);


// --- 2. Patch Contact.jsx ---
let contactContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

const conOldEmailBlock = `    if (!email) {
      errors.email = 'Email is required.';
    } else if (/\\s/.test(email)) {
      errors.email = 'Email must not contain whitespace.';
    } else if (!/^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }`;

const conNewEmailBlock = `    if (!email) {
      errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email) || /\\.\\./.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }`;

contactContent = contactContent.replace(conOldEmailBlock, conNewEmailBlock);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', contactContent);

console.log('Email validation simplified on both pages.');
