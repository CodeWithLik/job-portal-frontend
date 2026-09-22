const fs = require('fs');

// Patch Users.jsx
const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
if (fs.existsSync(usersPath)) {
  let content = fs.readFileSync(usersPath, 'utf8');

  // Patch the selects
  const oldSelectUsers = `className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"`;
  const newSelectUsers = `className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"`;
  content = content.replace(new RegExp(oldSelectUsers.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelectUsers);

  // Patch the container
  const oldContainerUsers = `<div className="flex flex-wrap gap-3 items-center">`;
  const newContainerUsers = `<div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">`;
  content = content.replace(oldContainerUsers, newContainerUsers);

  // Patch the button
  const oldButtonUsers = `<Button onClick={() => setAddUserModalOpen(true)} className="flex items-center gap-2 h-10">`;
  const newButtonUsers = `<Button onClick={() => setAddUserModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 h-10">`;
  content = content.replace(oldButtonUsers, newButtonUsers);

  fs.writeFileSync(usersPath, content);
  console.log('Patched Users.jsx');
}

// Patch Jobs.jsx
const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
if (fs.existsSync(jobsPath)) {
  let content = fs.readFileSync(jobsPath, 'utf8');

  // Patch the selects
  const oldSelectJobs = `className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  const newSelectJobs = `className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  content = content.replace(new RegExp(oldSelectJobs.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelectJobs);

  // Patch the container
  const oldContainerJobs = `<div className="flex flex-wrap gap-3">`;
  const newContainerJobs = `<div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">`;
  content = content.replace(oldContainerJobs, newContainerJobs);

  fs.writeFileSync(jobsPath, content);
  console.log('Patched Jobs.jsx');
}
