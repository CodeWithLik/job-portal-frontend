const fs = require('fs');

// 1. Update Privacy.jsx
let privacyContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', 'utf8');
privacyContent = privacyContent.replace(
  '<span className="underline decoration-blue-300 underline-offset-4">never</span>',
  'never'
);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Privacy.jsx', privacyContent);

// 2. Update Terms.jsx
let termsContent = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', 'utf8');

// Remove strong tag around "not a guarantee"
termsContent = termsContent.replace(
  '<strong className="text-slate-800">not a guarantee</strong>',
  'not a guarantee'
);

// Update Section 3 intro
termsContent = termsContent.replace(
  'Our platform uses Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight core strengths, and calculate job match scores. By using our service, you acknowledge that:',
  'Our platform uses Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight core strengths, and generate matching scores. By using our service, you acknowledge that:'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', termsContent);
console.log('Fixed styling in Privacy and Terms');
