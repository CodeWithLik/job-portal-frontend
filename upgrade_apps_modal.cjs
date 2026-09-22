const fs = require('fs');
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';
let content = fs.readFileSync(appsPath, 'utf8');

const regex = /<Modal isOpen=\{viewModalOpen\} onClose=\{\(\) => setViewModalOpen\(false\)\} title="Application Details">[\s\S]*?<\/Modal>/m;

const replacement = `<Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Application Details">
        {selectedApp && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-100 shrink-0">
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
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{selectedApp.seeker_name}</h3>
                  <p className="text-gray-600 text-sm">{selectedApp.seeker_email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <AppStatusBadge status={selectedApp.status} />
                <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Applied: <span className="font-semibold text-gray-700">{formatDate(selectedApp.applied_at)}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Applied For</span>
                <span className="text-sm font-medium text-gray-900 block truncate" title={selectedApp.job_title}>{selectedApp.job_title}</span>
                <span className="text-xs text-gray-500 block">{selectedApp.company_name}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">AI Match Score</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedApp.ai_match_score ? (
                    <span className={\`font-bold \${selectedApp.ai_match_score >= 80 ? 'text-green-600' : selectedApp.ai_match_score >= 50 ? 'text-amber-600' : 'text-red-600'}\`}>
                      {selectedApp.ai_match_score}%
                    </span>
                  ) : (
                    <span className="text-gray-400 font-normal">Pending</span>
                  )}
                </span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Application Assets</span>
                <div className="flex gap-4">
                  {selectedApp.resume_url ? (
                    <a href={getImageUrl(selectedApp.resume_url)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                      <Eye className="h-3 w-3 mr-1" /> View Resume
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-gray-400">No resume attached</span>
                  )}
                </div>
              </div>
            </div>
            
            {selectedApp.cover_letter && (
              <div>
                <span className="block text-xs font-semibold text-gray-700 mb-1">Cover Letter</span>
                <div className="bg-white border border-gray-100 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line max-h-32 overflow-y-auto shadow-inner">
                  {selectedApp.cover_letter}
                </div>
              </div>
            )}
            
            <div className="pt-3 shrink-0 border-t border-slate-100 flex items-center justify-end">
              <div>
                <Button variant="secondary" onClick={() => setViewModalOpen(false)} className="text-sm px-3 py-1.5">Close</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>`;

content = content.replace(regex, replacement);

if (!content.includes('const getImageUrl =')) {
  const getImageUrlReplacement = `const { user: currentUser } = useAuth();
  
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return \`\${baseUrl}\${url}\`;
  };`;
  
  content = content.replace('const { user: currentUser } = useAuth();', getImageUrlReplacement);
}

fs.writeFileSync(appsPath, content);
console.log('Fixed Applications.jsx modal!');
