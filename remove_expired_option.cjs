const fs = require('fs');

const patchFile = (path, isEdit) => {
  let content = fs.readFileSync(path, 'utf8');

  // Remove the <option value="expired">
  content = content.replace(/<option value="expired">Expired<\/option>\s*/g, '');

  // Remove the 'expired' branch from expires_at calculation
  const oldCalcRegex = /if \(formData\.duration_option === 'expired'\) \{\s*expiresAt = new Date\(Date\.now\(\) - 24 \* 60 \* 60 \* 1000\);\s*\/\/ 24 hours ago\s*\} else if \(formData\.duration_option === 'custom'\) \{/;
  
  const newCalc = `if (formData.duration_option === 'custom') {`;
  content = content.replace(oldCalcRegex, newCalc);

  // If this is EditJob, fix the initialization logic
  if (isEdit) {
    const oldInitRegex = /if \(job\.expires_at\) \{\s*const expiresDate = new Date\(job\.expires_at\);\s*if \(expiresDate <= new Date\(\)\) \{\s*currentDuration = 'expired';\s*\} else \{\s*const days = Math\.ceil\(\(expiresDate - new Date\(\)\) \/ \(1000 \* 60 \* 60 \* 24\)\);\s*if \(\[2, 5, 7, 15, 30\]\.includes\(days\)\) \{\s*currentDuration = days\.toString\(\);\s*\} else \{\s*currentDuration = 'custom';\s*currentCustomDate = new Date\(job\.expires_at\)\.toISOString\(\)\.split\('T'\)\[0\];\s*\}\s*\}\s*\}/;
    
    const newInit = `if (job.expires_at) {
          const expiresDate = new Date(job.expires_at);
          const days = Math.ceil((expiresDate - new Date()) / (1000 * 60 * 60 * 24));
          if (expiresDate > new Date() && [2, 5, 7, 15, 30].includes(days)) {
            currentDuration = days.toString();
          } else {
            currentDuration = 'custom';
            currentCustomDate = new Date(job.expires_at).toISOString().split('T')[0];
          }
        }`;
    content = content.replace(oldInitRegex, newInit);
  }

  fs.writeFileSync(path, content);
};

patchFile('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\PostJob.jsx', false);
patchFile('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\EditJob.jsx', true);

console.log('Removed Expired option from PostJob.jsx and EditJob.jsx');
