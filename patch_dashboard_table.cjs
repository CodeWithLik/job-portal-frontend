const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Fix wrapper
  content = content.replace(
    `<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">`,
    `<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">`
  );

  // Fix table
  content = content.replace(
    `<table className="min-w-full divide-y divide-gray-200">`,
    `<table className="min-w-full min-w-max whitespace-nowrap divide-y divide-gray-200">`
  );

  fs.writeFileSync(path, content);
  console.log('Patched Dashboard.jsx table scrolling');
} else {
  console.log('Dashboard.jsx not found');
}
