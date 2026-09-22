const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', 'utf8');

const oldSec2 = `<p>To ensure a safe and professional environment, the following actions are strictly prohibited on our platform:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Posting fraudulent, discriminatory, or highly offensive job listings.</li>
                <li>Uploading malicious files, viruses, or automated scraping scripts.</li>
                <li>Harassing other users or sending unsolicited spam through our messaging systems.</li>
              </ul>`;

const newSec2 = `<p>To ensure a safe and professional environment, the following actions are strictly prohibited on our platform:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Posting fraudulent, discriminatory, or misleading job listings.</li>
                <li>Submitting fabricated credentials, fake profiles, or falsified resume documents.</li>
                <li>Uploading malicious files, corrupted PDFs, viruses, or automated scraping scripts.</li>
                <li>Misusing the support ticket system or spamming repetitive, unsolicited job applications.</li>
              </ul>`;

const oldSec3 = `<p>Our platform utilizes Artificial Intelligence to parse resumes and generate matching scores. By using our service, you acknowledge that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI analysis is provided as a supportive tool to assist in recruitment, <strong className="text-slate-800">not a guarantee</strong> of employment or interview selection.</li>
                <li>While we strive for accuracy, AI parsing may occasionally misinterpret complex resume formats. Users are encouraged to manually review their parsed profiles for accuracy.</li>
              </ul>`;

const newSec3 = `<p>Our platform utilizes Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight strengths and areas of improvement, and calculate job match scores. By using our service, you acknowledge that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI analysis is provided as a supportive tool to assist job seekers in evaluating their profiles, <strong className="text-slate-800">not a guarantee</strong> of employment or interview selection.</li>
                <li>While we strive for high parsing precision, AI models may occasionally misinterpret complex resume layouts. Users are encouraged to manually review and verify their parsed profile details.</li>
              </ul>`;

content = content.replace(oldSec2, newSec2);
content = content.replace(oldSec3, newSec3);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Terms.jsx', content);
console.log('Terms of Service copy updated');
