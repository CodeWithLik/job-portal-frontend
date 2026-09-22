const fs = require('fs');
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';
let content = fs.readFileSync(appsPath, 'utf8');

const regex = /<Modal isOpen=\{viewModalOpen\} onClose=\{\(\) => setViewModalOpen\(false\)\} title="Application Details">[\s\S]*?<\/Modal>/m;

const replacement = `<Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Application Details">
        {selectedApp && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-200 shrink-0">
                  {selectedApp.seeker_photo ? (
                    <img 
                      src={getImageUrl(selectedApp.seeker_photo)} 
                      alt={selectedApp.seeker_name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    (selectedApp.seeker_name || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedApp.seeker_name}</h3>
                  <p className="text-gray-500">{selectedApp.seeker_email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <AppStatusBadge status={selectedApp.status} />
                <p className="text-xs text-gray-500 mt-2 whitespace-nowrap">Applied: <span className="font-semibold text-gray-700">{formatDate(selectedApp.applied_at)}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Applied For</span>
                <span className="font-medium text-gray-900 block truncate" title={selectedApp.job_title}>{selectedApp.job_title}</span>
                <span className="text-sm text-gray-500 block mt-0.5">{selectedApp.company_name}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Application Assets</span>
                <div className="flex gap-4 mt-0.5">
                  {selectedApp.resume_url ? (
                    <a href={getImageUrl(selectedApp.resume_url)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                      <Eye className="h-3 w-3 mr-1" /> View Resume
                    </a>
                  ) : (
                    <span className="font-medium text-gray-400">No resume attached</span>
                  )}
                </div>
              </div>
            </div>
            
            {selectedApp.cover_letter && (
              <div>
                <span className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</span>
                <div className="bg-white border border-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-line max-h-48 overflow-y-auto shadow-inner">
                  {selectedApp.cover_letter}
                </div>
              </div>
            )}
            
            <div className="pt-4 shrink-0 border-t border-slate-100 flex items-center justify-end">
              <Button variant="secondary" onClick={() => setViewModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>`;

content = content.replace(regex, replacement);
fs.writeFileSync(appsPath, content);
console.log('Fixed applications modal font sizes and removed AI match score');
