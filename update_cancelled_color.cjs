const fs = require('fs');

// 1. Update JobDetails.jsx
const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let jobDetailsContent = fs.readFileSync(jobDetailsPath, 'utf8');

jobDetailsContent = jobDetailsContent.replace(
  /cancelled: "bg-gray-100 text-gray-500",/g,
  'cancelled: "bg-rose-50 text-rose-700 border border-rose-200/60",'
);

fs.writeFileSync(jobDetailsPath, jobDetailsContent);

// 2. Update Applications.jsx
const applicationsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx';
let applicationsContent = fs.readFileSync(applicationsPath, 'utf8');

applicationsContent = applicationsContent.replace(
  /className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500"/g,
  'className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60"'
);

fs.writeFileSync(applicationsPath, applicationsContent);

console.log('Updated Position Cancelled badge color to soft rose');
