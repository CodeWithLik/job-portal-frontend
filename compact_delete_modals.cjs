const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

const oldDeleteModalUsers = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete User">
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
              ></textarea>`;

const newDeleteModalUsers = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete User">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently remove all associated account data and records.
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
                placeholder="e.g., Terms violation, fraudulent activity, user request..."
                disabled={isSubmitting}
              ></textarea>`;

usersContent = usersContent.replace(oldDeleteModalUsers, newDeleteModalUsers);
fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

const oldDeleteModalJobs = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job">
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
              ></textarea>`;

const newDeleteModalJobs = `<Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete <strong>{jobToDelete?.title}</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently remove all associated candidate applications.
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
                placeholder="e.g., Spam posting, expired opening, policy violation..."
                disabled={isSubmitting}
              ></textarea>`;

jobsContent = jobsContent.replace(oldDeleteModalJobs, newDeleteModalJobs);
fs.writeFileSync(jobsPath, jobsContent);

console.log("Compacted both Delete Modals");
