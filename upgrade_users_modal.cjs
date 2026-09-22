const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');

// I'll replace the View Details Modal Mock with the updated version
const regex = /{userToView && \(\s*<div className="space-y-4">[\s\S]*?<\/Modal>/m;

const replacement = `{userToView && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl overflow-hidden border border-blue-200 shrink-0">
                    {userToView.seeker_photo || userToView.recruiter_logo ? (
                      <img 
                        src={getImageUrl(userToView.seeker_photo || userToView.recruiter_logo)} 
                        alt={userToView.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      (userToView.company_name || userToView.name || 'U').charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{userToView.company_name || userToView.name}</h3>
                    <p className="text-gray-500">{userToView.email}</p>
                    {userToView.company_name && <p className="text-sm text-gray-400">Account: {userToView.name}</p>}
                  </div>
                </div>
                <Badge variant={userToView.status === 'Active' ? 'success' : 'error'}>{userToView.status}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</span>
                  <span className="capitalize font-medium text-gray-900">{userToView.role}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Joined Date</span>
                  <span className="font-medium text-gray-900">{formatDate(userToView.created_at)}</span>
                </div>

                {userToView.role === 'recruiter' && (
                  <>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industry</span>
                      <span className="font-medium text-gray-900">{userToView.industry || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Website</span>
                      {userToView.website ? (
                        <a href={userToView.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">{userToView.website.replace(/^https?:\\/\\//, '')}</a>
                      ) : (
                        <span className="font-medium text-gray-500">Not specified</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Activity</span>
                      <span className="font-medium text-gray-900">{userToView.jobs_count || 0} Jobs Posted</span>
                    </div>
                  </>
                )}

                {userToView.role === 'seeker' && (
                  <>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</span>
                      <span className="font-medium text-gray-900">{userToView.seeker_location || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</span>
                      <span className="font-medium text-gray-900">{userToView.seeker_phone || 'Not specified'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Activity</span>
                      <div className="flex gap-4">
                        <span className="font-medium text-gray-900">{userToView.applications_count || 0} Applications</span>
                        {userToView.seeker_resume_url && (
                          <a href={getImageUrl(userToView.seeker_resume_url)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                            <Eye className="h-3 w-3 mr-1" /> View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  {userToView.status === 'Active' ? (
                    <Button 
                      variant="outline" 
                      onClick={() => { setDetailsModalOpen(false); confirmSuspend(userToView); }}
                      className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                    >
                      Suspend Account
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => { setDetailsModalOpen(false); confirmActivate(userToView); }}
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                    >
                      Reactivate Account
                    </Button>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => { setDetailsModalOpen(false); confirmDelete(userToView); }} className="text-red-600 hover:bg-red-50 hover:text-red-700">Delete User</Button>
                  <Button onClick={() => setDetailsModalOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </Modal>`;

content = content.replace(regex, replacement);

// I also need to ensure getImageUrl is defined in this file. It is defined in Navbar.jsx but might not be here.
// Let's check if getImageUrl exists in Users.jsx.
if (!content.includes('const getImageUrl =')) {
  // Add getImageUrl helper function right after `const { user: currentUser } = useAuth();`
  const getImageUrlReplacement = `const { user: currentUser } = useAuth();
  
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return \`\${baseUrl}\${url}\`;
  };`;
  
  content = content.replace('const { user: currentUser } = useAuth();', getImageUrlReplacement);
}

fs.writeFileSync(usersPath, content);
console.log('Fixed Users.jsx modal UI!');
