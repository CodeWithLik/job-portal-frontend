const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

const searchStr1 = `question="How does the AI match score work?" 
                  answer="Our AI compares your parsed resume skills directly against the employer's job description to calculate a percentage match."`;

const replaceStr1 = `question="What does the AI Resume Analysis provide?" 
                  answer="It analyzes your uploaded resume to calculate an overall resume strength score, identify your top skills, highlight your strengths, and provide personalized suggestions for improvement."`;

const searchStr2 = `question="How do I delete my account or export data?" 
                  answer="Select 'General Inquiry' below and send us a message. Our privacy team will manually process your request."`;

const replaceStr2 = `question="How do I export my data or delete my account?" 
                  answer="Submit a message through the form on this page. Our support team will verify your account and process your complete data export or permanent deletion."`;

content = content.replace(searchStr1, replaceStr1);
content = content.replace(searchStr2, replaceStr2);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', content);
console.log('FAQs successfully replaced with specific phrasing');
