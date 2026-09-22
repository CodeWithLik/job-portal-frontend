const fs = require('fs');
const adminJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let adminContent = fs.readFileSync(adminJobsPath, 'utf8');

adminContent = adminContent.replace(
  /job\.status === 'Active' \? 'success' : \s*job\.status === 'Suspended' \? 'error' : 'gray'/,
  "job.status === 'Active' ? 'success' : \n                        job.status === 'Closed' ? 'sand' :\n                        job.status === 'Suspended' ? 'error' : 'gray'"
);

fs.writeFileSync(adminJobsPath, adminContent);
console.log('Fixed admin jobs badge variant via regex');
