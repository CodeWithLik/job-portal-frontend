const fs = require('fs');

const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(jobsPath, 'utf8');

// 1. Fix the logo shape to be a circle (rounded-full)
content = content.replace(
  '<div className="h-16 w-16 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xl overflow-hidden border border-blue-100 shrink-0">',
  '<div className="h-16 w-16 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xl overflow-hidden border border-blue-100 shrink-0">'
);

// 2. Fix the clipping by adding shrink-0 and extra padding to the footer div
// Current: <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
// New: <div className="pt-4 pb-2 shrink-0 border-t border-slate-100 flex items-center justify-between">
content = content.replace(
  '<div className="pt-4 border-t border-slate-100 flex items-center justify-between">',
  '<div className="pt-4 pb-2 shrink-0 border-t border-slate-100 flex items-center justify-between">'
);

// Also add a little margin bottom to the main space-y-6 container just in case
content = content.replace(
  '<div className="space-y-6">',
  '<div className="space-y-6 pb-2">'
);

fs.writeFileSync(jobsPath, content);
console.log('Fixed Jobs.jsx logo and clipping');
