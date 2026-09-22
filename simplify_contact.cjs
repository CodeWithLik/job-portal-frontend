const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Contact.jsx', 'utf8');

// 1. Remove category and subject from state initialization
content = content.replace(
  `    role: 'Job Seeker',
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''`,
  `    role: 'Job Seeker',
    name: '',
    email: '',
    message: ''`
);

content = content.replace(
  `      role: 'Job Seeker',
      name: '',
      email: '',
      category: '',
      subject: '',
      message: ''`,
  `      role: 'Job Seeker',
      name: '',
      email: '',
      message: ''`
);

// 2. Remove the Category and Subject HTML blocks completely
// I'll use regex to precisely delete the blocks.
content = content.replace(/<div[^>]*>\s*<label htmlFor="category"[\s\S]*?<\/select>\s*<\/div>\s*/g, '');
content = content.replace(/<div[^>]*>\s*<label htmlFor="subject"[\s\S]*?<\/input>\s*<\/div>\s*/g, '');

// 3. Change button text
content = content.replace("'Submit Support Ticket'", "'Send Message'");

fs.writeFileSync('src/pages/public/Contact.jsx', content);
console.log('Contact form simplified');
