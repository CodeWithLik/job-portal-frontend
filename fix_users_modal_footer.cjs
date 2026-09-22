const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');

const regex = /<div className="pt-4 border-t border-gray-100 flex justify-between items-center">[\s\S]*?<\/Modal>/m;

const replacement = `<div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-3">
                  {userToView.role !== 'admin' && (
                    <>
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
                      <Button 
                        variant="ghost" 
                        onClick={() => { setDetailsModalOpen(false); confirmDelete(userToView); }} 
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Delete User
                      </Button>
                    </>
                  )}
                </div>
                <div>
                  <Button onClick={() => setDetailsModalOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </Modal>`;

content = content.replace(regex, replacement);

fs.writeFileSync(usersPath, content);
console.log('Fixed Modal Footer in Users.jsx');
