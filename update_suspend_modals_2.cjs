const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

// The block to replace:
const oldUserModal = `<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend User">
          <form onSubmit={executeSuspend} className="space-y-4">
            <div>
              <p className="text-gray-700 text-base">Are you sure you want to suspend <strong>{userToSuspend?.name}</strong>?</p>
              <p className="text-sm text-gray-500 mt-1">This will revoke active sessions and prevent the user from signing in until unsuspended.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for suspension (Optional)</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                rows="3"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Violation of terms, abusive behavior, etc."
                disabled={isSubmitting}
              ></textarea>
              <p className="text-xs text-gray-400 mt-2">This reason will be included in the automated notification email sent to the user.</p>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setSuspendModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Suspending...' : 'Suspend User'}
              </Button>
            </div>
          </form>
        </Modal>`;

// Use regex replacement to handle any double periods gracefully if they exist in the live file, 
// though my previous script didn't add one.
let userModalCurrent = usersContent.substring(usersContent.indexOf('<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend User">'), usersContent.indexOf('</Modal>', usersContent.indexOf('<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend User">')) + 8);

const newUserModal = `<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend User">
          <form onSubmit={executeSuspend} className="space-y-4">
            <div>
              <p className="text-gray-700 text-base">Are you sure you want to suspend <strong>{userToSuspend?.name}</strong>?</p>
              <p className="text-sm text-gray-500 mt-1">This will revoke active sessions and prevent the user from signing in until unsuspended.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for suspension *</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                rows="3"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Violation of terms, abusive behavior, etc."
                disabled={isSubmitting}
                required
              ></textarea>
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the automated notification email sent to the user.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setSuspendModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting || !suspendReason.trim()}>
                {isSubmitting ? 'Suspending...' : 'Suspend User'}
              </Button>
            </div>
          </form>
        </Modal>`;

usersContent = usersContent.replace(userModalCurrent, newUserModal);
fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

let jobModalCurrent = jobsContent.substring(jobsContent.indexOf('<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend Job">'), jobsContent.indexOf('</Modal>', jobsContent.indexOf('<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend Job">')) + 8);

const newJobModal = `<Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend Job">
        <form onSubmit={executeSuspend} className="space-y-4">
          <div>
            <p className="text-gray-700 text-base">Are you sure you want to suspend <strong>{jobToSuspend?.title}</strong>?</p>
            <p className="text-sm text-gray-500 mt-1">This will hide the listing and prevent job seekers from applying until unsuspended.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for suspension *</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              rows="3"
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="e.g., Inaccurate job description, spam/duplicate listing, policy violation..."
              disabled={isSubmitting}
              required
            ></textarea>
            <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the automated notification email sent to the employer.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setSuspendModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting || !suspendReason.trim()}>
              {isSubmitting ? 'Suspending...' : 'Suspend Job'}
            </Button>
          </div>
        </form>
      </Modal>`;

jobsContent = jobsContent.replace(jobModalCurrent, newJobModal);
fs.writeFileSync(jobsPath, jobsContent);

console.log("Updated both Users.jsx and Jobs.jsx modals again");
