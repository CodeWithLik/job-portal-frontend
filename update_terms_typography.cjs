const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', 'utf8');

// 1. Apply text-pretty
content = content.replace(
  'leading-relaxed">',
  'leading-relaxed text-pretty">'
);

// 2. Clean Up Section 3 Intro Copy
const oldIntro3 = 'Our platform utilizes Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight strengths and areas of improvement, and calculate job match scores. By using our service, you acknowledge that:';
const newIntro3 = 'Our platform uses Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight core strengths, and calculate job match scores. By using our service, you acknowledge that:';
content = content.replace(oldIntro3, newIntro3);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', content);
console.log('Terms text-pretty and Section 3 updated.');
