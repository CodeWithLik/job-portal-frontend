const fs = require('fs');

const manageJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx';
let content = fs.readFileSync(manageJobsPath, 'utf8');

const oldModalContent = `              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Job?</h3>
                    <p className="text-gray-600">
                      Are you sure you want to delete <span className="font-semibold text-gray-900">"{jobToDelete.title}"</span>?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>`;

const newModalContent = `              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
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
                  Are you sure you want to delete "{jobToDelete.title}"?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. Public listings will be removed, but your existing applicant records will remain accessible.
                </p>
              </div>`;

content = content.replace(oldModalContent, newModalContent);

fs.writeFileSync(manageJobsPath, content);
console.log('Successfully updated Delete Job modal layout');
