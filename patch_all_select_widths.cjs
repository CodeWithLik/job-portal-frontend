const fs = require('fs');

const files = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Applicants.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx'
];

const oldSelect = `className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"`;
const newSelect = `className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"`;

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    if (content.includes(oldSelect)) {
      content = content.replace(new RegExp(oldSelect.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelect);
      fs.writeFileSync(path, content);
      console.log(`Successfully updated select widths in ${path}`);
    } else {
      console.log(`Could not find the target string in ${path}`);
    }
  } else {
    console.log(`File not found: ${path}`);
  }
});
