const fs = require('fs');

const dashboardPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(dashboardPath, 'utf8');

// Fix thead: change text-right to text-left on Posted Date
const oldTheadRegex = /<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date<\/th>/;
const newThead = `<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>`;
content = content.replace(oldTheadRegex, newThead);

// Fix tbody: remove text-right on the Posted Date cell
const oldTbodyRegex = /<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">\s*\{new Date\(job\.created_at\)\.toLocaleDateString\(\)\}\s*<\/td>/;
const newTbody = `<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>`;
content = content.replace(oldTbodyRegex, newTbody);

fs.writeFileSync(dashboardPath, content);
console.log('Fixed Posted Date alignment to be text-left');
