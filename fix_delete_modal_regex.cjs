const fs = require('fs');

const manageJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx';
let content = fs.readFileSync(manageJobsPath, 'utf8');

// Use robust regex to replace the modal body
const modalRegex = /<div className="p-6">\s*<div className="flex items-start gap-4">[\s\S]*?This action cannot be undone.[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newModalContent = `<div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Delete Job</h3>
                <button 
                  onClick={() => setJobToDelete(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 font-medium mb-1">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{jobToDelete.title}"</span>?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. Public listings will be removed, but your existing applicant records will remain accessible.
                </p>
              </div>`;

content = content.replace(modalRegex, newModalContent);

fs.writeFileSync(manageJobsPath, content);
console.log('Successfully updated Delete Job modal layout via regex');
