const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldModalHeader = `                <div>
                  <h3 className="text-lg font-bold text-gray-900">{jobToView.title}</h3>
                  <p className="text-gray-600 mb-1">{jobToView.company_name} • {jobToView.location}</p>
                  <p className="text-sm text-gray-500">Posted Date: {jobToView.created_at ? new Date(jobToView.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Badge variant={
                  jobToView.status === 'Active' ? 'success' : 
                  jobToView.status === 'Suspended' ? 'error' : 'gray'
                }>
                  {jobToView.status}
                </Badge>`;

const newModalHeader = `                <div>
                  <h3 className="text-lg font-bold text-gray-900">{jobToView.title}</h3>
                  <p className="text-gray-600 mb-1">{jobToView.company_name} • {jobToView.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant={
                    jobToView.status === 'Active' ? 'success' : 
                    jobToView.status === 'Suspended' ? 'error' : 'gray'
                  }>
                    {jobToView.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">Posted Date: {jobToView.created_at ? new Date(jobToView.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>`;

content = content.replace(oldModalHeader, newModalHeader);

fs.writeFileSync(path, content);
console.log('Moved Posted Date to the right in Job Details modal');
