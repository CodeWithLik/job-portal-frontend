const fs = require('fs');

const dashboardPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(dashboardPath, 'utf8');

const oldTheadRegex = /<thead className="bg-gray-50">\s*<tr>\s*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title<\/th>\s*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants<\/th>\s*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date<\/th>\s*<\/tr>\s*<\/thead>/;

const newThead = `<thead className="bg-gray-50">
                <tr>
                  <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                </tr>
              </thead>`;

content = content.replace(oldTheadRegex, newThead);

fs.writeFileSync(dashboardPath, content);
console.log('Updated table column widths in Dashboard.jsx');
