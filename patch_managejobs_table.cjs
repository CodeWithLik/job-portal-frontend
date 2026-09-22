const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ManageJobs.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');
  const oldTableStart = `<table className="w-full text-left border-collapse">`;
  const newTableStart = `<table className="w-full text-left border-collapse whitespace-nowrap min-w-max">`;

  if (content.includes(oldTableStart)) {
    content = content.replace(oldTableStart, newTableStart);
    fs.writeFileSync(path, content);
    console.log(`Successfully updated table in ${path}`);
  } else {
    console.log(`Could not find the target string in ${path}`);
  }
}
