const fs = require('fs');
const path = require('path');

const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(jobsPath, 'utf8');

const targetButtonRegex = /<button\s+onClick=\{\(\) => confirmSuspend\(job\)\}\s+className=\{`p-1\.5 rounded-md transition-colors \$\{\s*job\.status === 'Active'\s*\?\s*'text-gray-400 hover:text-orange-600 hover:bg-orange-50'\s*:\s*'text-gray-400 hover:text-green-600 hover:bg-green-50'\s*\}`\}\s+title=\{job\.status === 'Active' \? 'Suspend Job' : 'Activate Job'\}\s*>\s*\{job\.status === 'Active' \? <ShieldOff className="h-4 w-4" \/> : <Shield className="h-4 w-4" \/>\}\s*<\/button>/g;

const replacement = `<button 
                          onClick={() => confirmSuspend(job)} 
                          className={\`p-1.5 rounded-md transition-colors \${
                            job.status !== 'Suspended' 
                              ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' 
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }\`}
                          title={job.status !== 'Suspended' ? 'Suspend Job' : 'Activate Job'}
                        >
                          {job.status !== 'Suspended' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                        </button>`;

content = content.replace(targetButtonRegex, replacement);

fs.writeFileSync(jobsPath, content);
console.log('Fixed suspend button logic for closed jobs');
