const fs = require('fs');

const dashboardPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(dashboardPath, 'utf8');

const oldBlockRegex = /<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">\s*\{job\.applications_count \|\| 0\} Candidates\s*<\/span>/;

const newBlock = `<Link to={\`/recruiter/applicants?jobId=\${job.id}\`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">
                        {job.applications_count || 0} {job.applications_count === 1 ? 'Candidate' : 'Candidates'}
                      </Link>`;

content = content.replace(oldBlockRegex, newBlock);

fs.writeFileSync(dashboardPath, content);
console.log('Updated Dashboard.jsx Candidates badge to be a link');
