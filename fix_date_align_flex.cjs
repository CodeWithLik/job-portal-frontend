const fs = require('fs');

const dashboardPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(dashboardPath, 'utf8');

// Update TH
const oldTheadRegex = /<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date<\/th>/;
const newThead = `<th className="px-6 py-3">
                      <div className="flex justify-end">
                        <div className="w-28 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posted Date
                        </div>
                      </div>
                    </th>`;
content = content.replace(oldTheadRegex, newThead);

// Update TD
const oldTbodyRegex = /<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">\s*\{new Date\(job\.created_at\)\.toLocaleDateString\(\)\}\s*<\/td>/;
const newTbody = `<td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-end">
                        <div className="w-28 text-left text-sm text-gray-500">
                          {new Date(job.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </td>`;
content = content.replace(oldTbodyRegex, newTbody);

fs.writeFileSync(dashboardPath, content);
console.log('Fixed Posted Date alignment with flex-justify');
