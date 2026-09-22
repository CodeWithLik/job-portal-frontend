const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

// 1. Add state
usersContent = usersContent.replace(
  "const [suspendReason, setSuspendReason] = useState('');",
  "const [suspendReason, setSuspendReason] = useState('');\n  const [activateModalOpen, setActivateModalOpen] = useState(false);\n  const [userToActivate, setUserToActivate] = useState(null);"
);

// 2. Replace confirmSuspend
const oldConfirmSuspendUsers = `const confirmSuspend = async (user) => {
    if (user.status === 'Suspended') {
      // Direct activate
      try {
        await api.patch(\`/admin/users/\${user.id}/status\`, { status: 'Active' });
        setUsers(users.map(u => u.id === user.id ? { ...u, status: 'Active' } : u));
        showNotification('User account successfully activated.', 'success');
      } catch (err) {
        console.error('Failed to activate user:', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to activate user', 'error');
      }
      return;
    }
    setUserToSuspend(user);
    setSuspendReason('');
    setSuspendError('');
    setSuspendModalOpen(true);
  };`;

const newConfirmSuspendUsers = `const confirmSuspend = (user) => {
    if (user.status === 'Suspended') {
      setUserToActivate(user);
      setActivateModalOpen(true);
      return;
    }
    setUserToSuspend(user);
    setSuspendReason('');
    setSuspendError('');
    setSuspendModalOpen(true);
  };

  const executeActivate = async (e) => {
    e.preventDefault();
    if (userToActivate && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(\`/admin/users/\${userToActivate.id}/status\`, { status: 'Active' });
        setUsers(users.map(u => u.id === userToActivate.id ? { ...u, status: 'Active' } : u));
        setActivateModalOpen(false);
        setUserToActivate(null);
        showNotification('User account successfully activated.', 'success');
      } catch (err) {
        console.error('Failed to activate user:', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to activate user', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };`;

usersContent = usersContent.replace(oldConfirmSuspendUsers, newConfirmSuspendUsers);

// 3. Add Modal
const activateUserModal = `
        {/* Reactivate User Modal */}
        <Modal isOpen={activateModalOpen} onClose={() => setActivateModalOpen(false)} title="Reactivate Account">
          <form onSubmit={executeActivate} className="space-y-4">
            <p className="text-gray-700 text-base">
              Are you sure you want to restore access for <strong>{userToActivate?.name}</strong>?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setActivateModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Reactivating...' : 'Reactivate'}
              </Button>
            </div>
          </form>
        </Modal>
`;

usersContent = usersContent.replace(
  "{/* Suspend User Modal */}",
  activateUserModal + "\n        {/* Suspend User Modal */}"
);

fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

// 1. Add state
jobsContent = jobsContent.replace(
  "const [suspendReason, setSuspendReason] = useState('');",
  "const [suspendReason, setSuspendReason] = useState('');\n  const [activateModalOpen, setActivateModalOpen] = useState(false);\n  const [jobToActivate, setJobToActivate] = useState(null);"
);

// 2. Replace confirmSuspend and executeActivate
const oldConfirmSuspendJobs = `const confirmSuspend = (job) => {
    if (job.status === 'Suspended') {
      executeActivate(job);
    } else {
      setJobToSuspend(job);
      setSuspendReason('');
      setSuspendError('');
      setSuspendModalOpen(true);
    }
  };

  const executeActivate = async (job) => {
    try {
      await api.patch(\`/admin/jobs/\${job.id}\`, { status: 'Active' });
      setJobs(jobs.map(j => j.id === job.id ? { ...j, status: 'Active' } : j));
      showNotification('Job status updated to Active');
    } catch (err) {
      console.error('Failed to activate job:', err);
      showNotification('Failed to activate job');
    }
  };`;

const newConfirmSuspendJobs = `const confirmSuspend = (job) => {
    if (job.status === 'Suspended') {
      setJobToActivate(job);
      setActivateModalOpen(true);
    } else {
      setJobToSuspend(job);
      setSuspendReason('');
      setSuspendError('');
      setSuspendModalOpen(true);
    }
  };

  const executeActivate = async (e) => {
    e.preventDefault();
    if (jobToActivate && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(\`/admin/jobs/\${jobToActivate.id}\`, { status: 'Active' });
        setJobs(jobs.map(j => j.id === jobToActivate.id ? { ...j, status: 'Active' } : j));
        setActivateModalOpen(false);
        setJobToActivate(null);
        showNotification('Job listing successfully activated.', 'success');
      } catch (err) {
        console.error('Failed to activate job:', err);
        showNotification('Failed to activate job', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };`;

jobsContent = jobsContent.replace(oldConfirmSuspendJobs, newConfirmSuspendJobs);

// 3. Add Modal
const activateJobModal = `
      {/* Reactivate Job Modal */}
      <Modal isOpen={activateModalOpen} onClose={() => setActivateModalOpen(false)} title="Reactivate Job">
        <form onSubmit={executeActivate} className="space-y-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to restore access for <strong>{jobToActivate?.title}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setActivateModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? 'Reactivating...' : 'Reactivate'}
            </Button>
          </div>
        </form>
      </Modal>
`;

jobsContent = jobsContent.replace(
  "{/* Suspend Job Modal */}",
  activateJobModal + "\n      {/* Suspend Job Modal */}"
);

fs.writeFileSync(jobsPath, jobsContent);
console.log('Updated UI for Reactivation modals');
