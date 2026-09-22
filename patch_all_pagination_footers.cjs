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
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx'
];

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    let changed = false;

    // Pattern 1: flex flex-wrap gap-4 items-center justify-between
    const regex1 = /className="([^"]*)flex flex-wrap gap-4 items-center justify-between([^"]*)"/g;
    if (regex1.test(content)) {
      content = content.replace(regex1, 'className="$1flex flex-col md:flex-row gap-4 items-center justify-between$2"');
      changed = true;
    }

    // Pattern 2: flex items-center justify-between (like in FindJobs and Seeker/Applications)
    const regex2 = /className="([^"]*)p-4 flex items-center justify-between([^"]*)"/g;
    if (regex2.test(content)) {
      content = content.replace(regex2, 'className="$1p-4 flex flex-col md:flex-row gap-4 items-center justify-between$2"');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(path, content);
      console.log(`Updated footer layout in: ${path}`);
    } else {
      console.log(`No match in: ${path}`);
    }
  } else {
    console.log(`File not found: ${path}`);
  }
});
