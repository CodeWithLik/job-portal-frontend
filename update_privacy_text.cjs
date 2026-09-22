const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', 'utf8');

// 1. Job Seekers
content = content.replace(
  'Name, email address, phone number, employment history, education, skills, and uploaded resume documents (PDF/DOCX).',
  'Name, email address, phone number, location, professional summary, skills, and uploaded resume files (PDF).'
);

// 2. Employers
content = content.replace(
  'Company name, contact details, job descriptions, and recruitment preferences.',
  'Company name, contact details, company description, posted job listings, and recruitment preferences.'
);

// 3. Data Security
content = content.replace(
  'We implement strict security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encrypted password storage, secure data transit (HTTPS), and restricted database access.',
  'We implement strict security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encrypted password hashing, protected resume file storage, secure data transit (HTTPS), and restricted database access.'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', content);
console.log('Privacy policy text updated.');
