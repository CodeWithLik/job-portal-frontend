const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

// 1. Add suspendError state
usersContent = usersContent.replace(
  "const [suspendReason, setSuspendReason] = useState('');",
  "const [suspendReason, setSuspendReason] = useState('');\n  const [suspendError, setSuspendError] = useState('');"
);

// 2. Reset suspendError in confirmSuspend
usersContent = usersContent.replace(
  "setUserToSuspend(user);\n    setSuspendModalOpen(true);",
  "setUserToSuspend(user);\n    setSuspendReason('');\n    setSuspendError('');\n    setSuspendModalOpen(true);"
);

// 3. Add validation logic in executeSuspend
const oldExecuteSuspendUsers = `const executeSuspend = async (e) => {
    e.preventDefault();
    if (userToSuspend && !isSubmitting) {`;
const newExecuteSuspendUsers = `const executeSuspend = async (e) => {
    e.preventDefault();
    if (!suspendReason.trim()) {
      setSuspendError('Please provide a reason for suspension.');
      return;
    }
    if (userToSuspend && !isSubmitting) {`;
usersContent = usersContent.replace(oldExecuteSuspendUsers, newExecuteSuspendUsers);

// 4. Update the Textarea and Button in the Modal
let oldTextAreaUsers = `<textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                rows="3"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Violation of terms, abusive behavior, etc."
                disabled={isSubmitting}
                required
              ></textarea>`;

let newTextAreaUsers = `<textarea 
                className={\`w-full px-3 py-2 border \${suspendError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors\`} 
                rows="3"
                value={suspendReason}
                onChange={(e) => {
                  setSuspendReason(e.target.value);
                  if (suspendError) setSuspendError('');
                }}
                placeholder="Violation of terms, abusive behavior, etc."
                disabled={isSubmitting}
                required
              ></textarea>
              {suspendError && <p className="text-red-500 text-sm mt-1">{suspendError}</p>}`;
usersContent = usersContent.replace(oldTextAreaUsers, newTextAreaUsers);

usersContent = usersContent.replace(
  `disabled={isSubmitting || !suspendReason.trim()}`,
  `disabled={isSubmitting}`
);

fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

// 1. Add suspendError state
jobsContent = jobsContent.replace(
  "const [suspendReason, setSuspendReason] = useState('');",
  "const [suspendReason, setSuspendReason] = useState('');\n  const [suspendError, setSuspendError] = useState('');"
);

// 2. Reset suspendError in confirmSuspend
jobsContent = jobsContent.replace(
  "setSuspendReason('');\n      setSuspendModalOpen(true);",
  "setSuspendReason('');\n      setSuspendError('');\n      setSuspendModalOpen(true);"
);

// 3. Add validation logic in executeSuspend
const oldExecuteSuspendJobs = `const executeSuspend = async (e) => {
    e.preventDefault();
    if (jobToSuspend && !isSubmitting) {`;
const newExecuteSuspendJobs = `const executeSuspend = async (e) => {
    e.preventDefault();
    if (!suspendReason.trim()) {
      setSuspendError('Please provide a reason for suspension.');
      return;
    }
    if (jobToSuspend && !isSubmitting) {`;
jobsContent = jobsContent.replace(oldExecuteSuspendJobs, newExecuteSuspendJobs);

// 4. Update the Textarea and Button in the Modal
let oldTextAreaJobs = `<textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              rows="3"
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="e.g., Inaccurate job description, spam/duplicate listing, policy violation..."
              disabled={isSubmitting}
              required
            ></textarea>`;

let newTextAreaJobs = `<textarea 
              className={\`w-full px-3 py-2 border \${suspendError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors\`} 
              rows="3"
              value={suspendReason}
              onChange={(e) => {
                setSuspendReason(e.target.value);
                if (suspendError) setSuspendError('');
              }}
              placeholder="e.g., Inaccurate job details, spam listing, policy violation..."
              disabled={isSubmitting}
              required
            ></textarea>
            {suspendError && <p className="text-red-500 text-sm mt-1">{suspendError}</p>}`;
jobsContent = jobsContent.replace(oldTextAreaJobs, newTextAreaJobs);

jobsContent = jobsContent.replace(
  `disabled={isSubmitting || !suspendReason.trim()}`,
  `disabled={isSubmitting}`
);

fs.writeFileSync(jobsPath, jobsContent);

console.log("Updated both Users.jsx and Jobs.jsx with inline validation feedback and shortened placeholder");
