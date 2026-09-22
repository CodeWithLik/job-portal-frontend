const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Applicants.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Patch the selects
  const oldSelect = `className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  const newSelect = `className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  content = content.replace(new RegExp(oldSelect.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelect);

  // Patch the container for the filter so the dropdowns don't wrap weirdly if w-full md:w-auto is used
  const oldContainer = `<div className="flex flex-wrap gap-4 items-center">`;
  const newContainer = `<div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">`;
  content = content.replace(oldContainer, newContainer);

  fs.writeFileSync(path, content);
  console.log('Patched Applicants.jsx filters');
}
