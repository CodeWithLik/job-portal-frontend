const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\EditJob.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldInitRegex = /if \(job\.expires_at\) \{\s*const expiresDate = new Date\(job\.expires_at\);\s*if \(expiresDate <= new Date\(\)\) \{\s*currentDuration = 'expired';\s*\} else \{\s*const days = Math\.ceil\(\(expiresDate - new Date\(\)\) \/ \(1000 \* 60 \* 60 \* 24\)\);\s*if \(\[2, 5, 7, 15, 30\]\.includes\(days\)\) \{\s*currentDuration = days\.toString\(\);\s*\} else \{\s*currentDuration = 'custom';\s*customDate = expiresDate\.toISOString\(\)\.split\('T'\)\[0\];\s*\}\s*\}\s*\}/;

const newInit = `if (job.expires_at) {
          const expiresDate = new Date(job.expires_at);
          const days = Math.ceil((expiresDate - new Date()) / (1000 * 60 * 60 * 24));
          if (expiresDate > new Date() && [2, 5, 7, 15, 30].includes(days)) {
            currentDuration = days.toString();
          } else {
            currentDuration = 'custom';
            customDate = expiresDate.toISOString().split('T')[0];
          }
        }`;

content = content.replace(oldInitRegex, newInit);

fs.writeFileSync(path, content);
console.log('Fixed EditJob.jsx init logic');
