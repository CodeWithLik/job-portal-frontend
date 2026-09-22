const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // We want to add w-full lg:w-auto to all the filter select inputs.
  const oldSelect = `className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"`;
  const newSelect = `className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"`;

  if (content.includes(oldSelect)) {
    content = content.replace(new RegExp(oldSelect.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelect);
    fs.writeFileSync(path, content);
    console.log(`Successfully updated select widths in ${path}`);
  } else {
    console.log(`Could not find the target string in ${path}`);
  }
}
