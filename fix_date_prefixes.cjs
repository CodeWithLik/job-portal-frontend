const fs = require('fs');
const path = require('path');

// Fix Applications.jsx
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx';
let appsContent = fs.readFileSync(appsPath, 'utf8');
appsContent = appsContent.replace(
  '<Calendar className="h-4 w-4" /> Applied on {formatDate(app.applied_at)}',
  '<Calendar className="h-4 w-4" /> Applied on: {formatDate(app.applied_at)}'
);
fs.writeFileSync(appsPath, appsContent);

// Fix JobDetails.jsx
const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let jobDetailsContent = fs.readFileSync(jobDetailsPath, 'utf8');
jobDetailsContent = jobDetailsContent.replace(
  '<div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Posted {formatDate(job.created_at)}</div>',
  '<div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Posted on: {formatDate(job.created_at)}</div>'
);
fs.writeFileSync(jobDetailsPath, jobDetailsContent);

console.log('Fixed "on:" prefixes for dates');
