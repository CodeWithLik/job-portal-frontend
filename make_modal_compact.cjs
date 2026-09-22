const fs = require('fs');
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(jobsPath, 'utf8');

const regex = /<Modal isOpen=\{detailsModalOpen\} onClose=\{\(\) => setDetailsModalOpen\(false\)\} title="Job Details">[\s\S]*?<\/Modal>/m;

const replacement = `<Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="Job Details">
        {jobToView && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-100 shrink-0">
                  {jobToView.company_logo ? (
                    <img 
                      src={getImageUrl(jobToView.company_logo)} 
                      alt={jobToView.company_name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    (jobToView.company_name || 'C').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{jobToView.title}</h3>
                  <p className="text-gray-600 text-sm">{jobToView.company_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{jobToView.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant={
                  jobToView.status === 'Active' ? 'success' : 
                  jobToView.status === 'Suspended' ? 'error' : 'gray'
                }>
                  {jobToView.status}
                </Badge>
                <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Posted: <span className="font-semibold text-gray-700">{formatDate(jobToView.created_at)}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Salary Range</span>
                <span className="text-sm font-medium text-gray-900">
                  {jobToView.salary_min && jobToView.salary_max 
                    ? \`$\${jobToView.salary_min.toLocaleString()} - $\${jobToView.salary_max.toLocaleString()}\`
                    : 'Not specified'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Employment Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{jobToView.employment_type || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Category</span>
                <span className="text-sm font-medium text-gray-900">{jobToView.category || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Total Applicants</span>
                <span className="text-sm font-medium text-blue-600">{jobToView.application_count || 0} applications</span>
              </div>
            </div>
            
            <div>
              <span className="block text-xs font-semibold text-gray-700 mb-1">Job Description</span>
              <div className="bg-white border border-gray-100 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line max-h-32 overflow-y-auto shadow-inner">
                {jobToView.description}
              </div>
            </div>
            
            <div className="pt-3 shrink-0 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                {jobToView.status !== 'Suspended' ? (
                  <Button 
                    variant="ghost" 
                    onClick={() => { setDetailsModalOpen(false); confirmSuspend(jobToView); }}
                    className="text-orange-600 hover:bg-orange-50 hover:text-orange-700 text-sm px-3 py-1.5"
                  >
                    Suspend Job
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={() => { setDetailsModalOpen(false); confirmActivate(jobToView); }}
                    className="text-green-600 hover:bg-green-50 hover:text-green-700 text-sm px-3 py-1.5"
                  >
                    Activate Job
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => { setDetailsModalOpen(false); confirmDelete(jobToView); }} 
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 text-sm px-3 py-1.5"
                >
                  Delete Job
                </Button>
              </div>
              <div>
                <Button variant="secondary" onClick={() => setDetailsModalOpen(false)} className="text-sm px-3 py-1.5">Close</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>`;

content = content.replace(regex, replacement);
fs.writeFileSync(jobsPath, content);
console.log('Made job details modal significantly more compact.');
