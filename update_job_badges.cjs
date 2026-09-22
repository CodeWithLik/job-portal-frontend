const fs = require('fs');

const adminJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let adminContent = fs.readFileSync(adminJobsPath, 'utf8');

const oldAdminBadge = `                      <Badge variant={
                        job.status === 'Active' ? 'success' : 
                        job.status === 'Suspended' ? 'error' : 'gray'
                      }>`;
const newAdminBadge = `                      <Badge variant={
                        job.status === 'Active' ? 'success' : 
                        job.status === 'Closed' ? 'sand' :
                        job.status === 'Suspended' ? 'error' : 'gray'
                      }>`;

adminContent = adminContent.replace(oldAdminBadge, newAdminBadge);
fs.writeFileSync(adminJobsPath, adminContent);

const recruiterJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx';
let recruiterContent = fs.readFileSync(recruiterJobsPath, 'utf8');

const oldRecruiterBadge = `const badgeVariant = job.status === 'Closed' ? 'gray' : job.status === 'Suspended' ? 'error' : isExpired ? 'danger' : job.status === 'Active' ? 'success' : 'warning';`;
const newRecruiterBadge = `const badgeVariant = job.status === 'Closed' ? 'sand' : job.status === 'Suspended' ? 'error' : isExpired ? 'danger' : job.status === 'Active' ? 'success' : 'warning';`;

recruiterContent = recruiterContent.replace(oldRecruiterBadge, newRecruiterBadge);
fs.writeFileSync(recruiterJobsPath, recruiterContent);

console.log('Updated badge colors in Admin and Recruiter job lists');
