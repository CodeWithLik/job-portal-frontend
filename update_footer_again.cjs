const fs = require('fs');
let content = fs.readFileSync('src/layouts/PublicLayout.jsx', 'utf8');

// Update Tagline
const oldTagline = "Empowering your career with AI-driven job matching, instant resume analysis, and seamless applicant tracking.";
const newTagline = "Empowering candidates with AI resume feedback while giving employers a seamless platform to post jobs and review applicants.";
content = content.replace(oldTagline, newTagline);

// Remove "Company Profile" line
const companyProfileLine = `<li><Link to={getEmployerLink('/recruiter/company')} className="hover:text-white transition-colors">Company Profile</Link></li>`;
content = content.replace(companyProfileLine, "");

fs.writeFileSync('src/layouts/PublicLayout.jsx', content);
console.log('Footer updated successfully');
