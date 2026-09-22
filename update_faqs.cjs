const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

const oldFaqs = `<FaqItem 
                  question="Having issues parsing a resume?" 
                  answer="Ensure your document is in PDF or DOCX format and under 5MB." 
                />
                <FaqItem 
                  question="Need to edit a posted job?" 
                  answer="Head to your Employer Dashboard \\u2192 Manage Jobs \\u2192 Edit." 
                />
                <FaqItem 
                  question="Can recruiters see my profile before I apply?" 
                  answer="No, your profile and resume are only shared with recruiters when you submit an application." 
                />`;

const newFaqs = `<FaqItem 
                  question="Having issues parsing a resume?" 
                  answer="Ensure your document is in PDF format and under 5MB." 
                />
                <FaqItem 
                  question="Need to edit a posted job?" 
                  answer="Head to your Employer Dashboard \\u2192 Manage Jobs \\u2192 Edit." 
                />
                <FaqItem 
                  question="Can recruiters see my profile before I apply?" 
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

// Use replace with a very specific string or just a regex if there's unicode mismatches (like the arrow).
// The arrow in the old text might be '→' or '\u2192' or ''' depending on encoding. Let's just use regex on the first FAQ and insert the new ones after the third.
