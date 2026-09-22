const fs = require('fs');

const files = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Applicants.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx'
];

const oldString = `className="flex flex-wrap gap-2 items-center"`;
const newString = `className="flex flex-wrap justify-center gap-2 items-center w-full md:w-auto"`;

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    if (content.includes(oldString)) {
      content = content.replace(new RegExp(oldString.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newString);
      fs.writeFileSync(path, content);
      console.log(`Successfully updated button centering in ${path}`);
    } else {
      console.log(`Could not find the target string in ${path}`);
    }
  } else {
    console.log(`File not found: ${path}`);
  }
});
