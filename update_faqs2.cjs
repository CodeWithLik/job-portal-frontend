const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

// Fix the PDF string
content = content.replace('PDF or DOCX', 'PDF');

// Inject new FAQs
const searchStr = `question="Can recruiters see my profile before I apply?" 
                  answer="No, your profile and resume are only shared with recruiters when you submit an application." 
                />`;

const replaceStr = `question="Can recruiters see my profile before I apply?" 
                  answer="No, your profile and resume are only shared with recruiters when you submit an application." 
                />
                <FaqItem 
                  question="How does the AI match score work?" 
                  answer="Our AI compares your parsed resume skills directly against the employer's job description to calculate a percentage match." 
                />
                <FaqItem 
                  question="How do I delete my account or export data?" 
                  answer="Select 'General Inquiry' below and send us a message. Our privacy team will manually process your request." 
                />`;

content = content.replace(searchStr, replaceStr);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', content);
console.log('FAQs updated successfully');
