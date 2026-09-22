const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

const oldLogic = `{isSeekerPage 
              ? "This section is exclusively for Job Seekers. Only candidate accounts can manage applications and access AI resume analysis."
              : "This section is exclusively for Employers and Recruiters. Only employer accounts can post jobs and review applicants."}`;

const newLogic = `{role === 'seeker' 
              ? "This section is exclusively for Job Seekers. Only candidate accounts can manage applications and access AI resume analysis."
              : role === 'recruiter'
              ? "This section is exclusively for Employers and Recruiters. Only employer accounts can post jobs and review applicants."
              : "This section requires Administrator privileges to access."}`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Fixed RBAC text for Admin');
