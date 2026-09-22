const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

// 1. Add deleteReason and deleteError state
usersContent = usersContent.replace(
  "const [userToDelete, setUserToDelete] = useState(null);",
  "const [userToDelete, setUserToDelete] = useState(null);\n  const [deleteReason, setDeleteReason] = useState('');\n  const [deleteError, setDeleteError] = useState('');"
);

// 2. Reset deleteReason and deleteError in confirmDelete
usersContent = usersContent.replace(
  "const confirmDelete = (user) => {\n    setUserToDelete(user);\n    setDeleteModalOpen(true);\n  };",
  "const confirmDelete = (user) => {\n    setUserToDelete(user);\n    setDeleteReason('');\n    setDeleteError('');\n    setDeleteModalOpen(true);\n  };"
);

// 3. Update executeDelete
const oldExecuteDeleteUsers = `const executeDelete = async () => {
    if (userToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(\`/admin/users/\${userToDelete.id}\`);`;

const newExecuteDeleteUsers = `const executeDelete = async (e) => {
    e.preventDefault();
    if (!deleteReason.trim()) {
      setDeleteError('Please provide a reason for deletion.');
      return;
    }
    if (userToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(\`/admin/users/\${userToDelete.id}\`, { data: { reason: deleteReason } });`;

usersContent = usersContent.replace(oldExecuteDeleteUsers, newExecuteDeleteUsers);

// 4. Update Delete Modal
let deleteModalCurrentUsers = usersContent.substring(usersContent.indexOf('<Modal isOpen={deleteModalOpen}'), usersContent.indexOf('</Modal>', usersContent.indexOf('<Modal isOpen={deleteModalOpen}')) + 8);

const newDeleteModalUsers = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete User">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-semibold text-lg">Warning: Permanent Action</span>
            </div>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete <strong>{userToDelete?.name}</strong> ({userToDelete?.email})?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently remove their profile, access, and associated records.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for deletion *</label>
              <textarea 
                className={\`w-full px-3 py-2 border \${deleteError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors\`} 
                rows="3"
                value={deleteReason}
                onChange={(e) => {
                  setDeleteReason(e.target.value);
                  if (deleteError) setDeleteError('');
                }}
                placeholder="e.g., Account violates terms of service, fraud, user requested removal..."
                disabled={isSubmitting}
              ></textarea>
              {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the deletion notification email sent to the user.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setDeleteModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Delete User'}
              </Button>
            </div>
          </form>
        </Modal>`;

usersContent = usersContent.replace(deleteModalCurrentUsers, newDeleteModalUsers);
fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

// 1. Add deleteReason and deleteError state
jobsContent = jobsContent.replace(
  "const [jobToDelete, setJobToDelete] = useState(null);",
  "const [jobToDelete, setJobToDelete] = useState(null);\n  const [deleteReason, setDeleteReason] = useState('');\n  const [deleteError, setDeleteError] = useState('');"
);

// 2. Reset deleteReason and deleteError in confirmDelete
jobsContent = jobsContent.replace(
  "const confirmDelete = (job) => {\n    setJobToDelete(job);\n    setDeleteModalOpen(true);\n  };",
  "const confirmDelete = (job) => {\n    setJobToDelete(job);\n    setDeleteReason('');\n    setDeleteError('');\n    setDeleteModalOpen(true);\n  };"
);

// 3. Update executeDelete
const oldExecuteDeleteJobs = `const executeDelete = async () => {
    if (jobToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(\`/admin/jobs/\${jobToDelete.id}\`);`;

const newExecuteDeleteJobs = `const executeDelete = async (e) => {
    e.preventDefault();
    if (!deleteReason.trim()) {
      setDeleteError('Please provide a reason for deletion.');
      return;
    }
    if (jobToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(\`/admin/jobs/\${jobToDelete.id}\`, { data: { reason: deleteReason } });`;

jobsContent = jobsContent.replace(oldExecuteDeleteJobs, newExecuteDeleteJobs);

// 4. Update Delete Modal
let deleteModalCurrentJobs = jobsContent.substring(jobsContent.indexOf('<Modal isOpen={deleteModalOpen}'), jobsContent.indexOf('</Modal>', jobsContent.indexOf('<Modal isOpen={deleteModalOpen}')) + 8);

const newDeleteModalJobs = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-semibold text-lg">Warning: Permanent Action</span>
            </div>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete the job listing <strong>'{jobToDelete?.title}'</strong> ({jobToDelete?.company_name})?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently delete all associated candidate applications.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for deletion *</label>
              <textarea 
                className={\`w-full px-3 py-2 border \${deleteError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors\`} 
                rows="3"
                value={deleteReason}
                onChange={(e) => {
                  setDeleteReason(e.target.value);
                  if (deleteError) setDeleteError('');
                }}
                placeholder="e.g., Spam posting, expired or invalid opening, policy violation..."
                disabled={isSubmitting}
              ></textarea>
              {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the deletion notification email sent to the employer.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setDeleteModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Delete Job'}
              </Button>
            </div>
          </form>
        </Modal>`;

jobsContent = jobsContent.replace(deleteModalCurrentJobs, newDeleteModalJobs);
fs.writeFileSync(jobsPath, jobsContent);

console.log("Updated both Delete Modals with reasons and new styling");
