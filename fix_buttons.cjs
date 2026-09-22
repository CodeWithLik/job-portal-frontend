const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

const oldBrowseJobs = `<Button className="w-full sm:w-auto px-8 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-0 rounded-md">`;
const newBrowseJobs = `<Button className="w-full sm:w-auto px-8 py-3 text-lg">`;

const oldPostJob = `<Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg font-medium bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm rounded-md">`;
const newPostJob = `<Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">`;

content = content.replace(oldBrowseJobs, newBrowseJobs);
content = content.replace(oldPostJob, newPostJob);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Fixed About.jsx button styles');
