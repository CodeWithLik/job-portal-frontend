const fs = require('fs');

// --- UPDATE Users.jsx ---
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let usersContent = fs.readFileSync(usersPath, 'utf8');

// Add noValidate to the form to prevent native tooltips on other inputs if any
usersContent = usersContent.replace(
  '<form onSubmit={executeSuspend} className="space-y-4">',
  '<form onSubmit={executeSuspend} className="space-y-4" noValidate>'
);

// Remove 'required' from the textarea
usersContent = usersContent.replace(
  /disabled={isSubmitting}\s+required\s*><\/textarea>/g,
  'disabled={isSubmitting}\n              ></textarea>'
);

fs.writeFileSync(usersPath, usersContent);

// --- UPDATE Jobs.jsx ---
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let jobsContent = fs.readFileSync(jobsPath, 'utf8');

// Add noValidate to the form
jobsContent = jobsContent.replace(
  '<form onSubmit={executeSuspend} className="space-y-4">',
  '<form onSubmit={executeSuspend} className="space-y-4" noValidate>'
);

// Remove 'required' from the textarea
jobsContent = jobsContent.replace(
  /disabled={isSubmitting}\s+required\s*><\/textarea>/g,
  'disabled={isSubmitting}\n            ></textarea>'
);

fs.writeFileSync(jobsPath, jobsContent);

console.log("Removed native HTML validation and required attributes");
