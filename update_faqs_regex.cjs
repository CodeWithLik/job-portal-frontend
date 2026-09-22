const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

const newFaqs = `                <FaqItem 
                  question="How does the AI match score work?" 
                  answer="Our AI compares your parsed resume skills directly against the employer's job description to calculate a percentage match." 
                />
                <FaqItem 
                  question="How do I delete my account or export data?" 
                  answer="Select 'General Inquiry' below and send us a message. Our privacy team will manually process your request." 
                />
              </div>`;

// Use regex to replace the closing tag of the last FaqItem and the following </div>
content = content.replace(/answer="No, your profile and resume are only shared with recruiters when you submit an application."\s*\/>\s*<\/div>/g, 
  `answer="No, your profile and resume are only shared with recruiters when you submit an application." \n                />\n${newFaqs}`);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', content);
console.log('FAQs successfully injected');
