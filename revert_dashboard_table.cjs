const fs = require('fs');

const dashboardPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(dashboardPath, 'utf8');

// Revert thead
const oldTheadRegex = /<thead className="bg-gray-50">[\s\S]*?<\/thead>/;
const newThead = `<thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                </tr>
              </thead>`;
content = content.replace(oldTheadRegex, newThead);

// Revert tbody cells
const oldTbodyRegex = /<td className="px-6 py-4 whitespace-nowrap text-center">\s*<Link to=\{\`\/recruiter\/applicants\?jobId=\$\{job\.id\}\`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">\s*\{job\.applications_count \|\| 0\} \{job\.applications_count === 1 \? 'Candidate' : 'Candidates'\}\s*<\/Link>\s*<\/td>\s*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">\s*\{new Date\(job\.created_at\)\.toLocaleDateString\(\)\}\s*<\/td>/;

const newTbodyCells = `<td className="px-6 py-4 whitespace-nowrap">
                      <Link to={\`/recruiter/applicants?jobId=\${job.id}\`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">
                          {job.applications_count || 0} {job.applications_count === 1 ? 'Candidate' : 'Candidates'}
                        </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>`;
                    
content = content.replace(oldTbodyRegex, newTbodyCells);

fs.writeFileSync(dashboardPath, content);
console.log('Reverted table spacing and alignments in Dashboard.jsx');
