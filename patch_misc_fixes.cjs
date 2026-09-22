const fs = require('fs');

// 1. Patch DashboardLayout.jsx hamburger toggle
const layoutPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx';
if (fs.existsSync(layoutPath)) {
  let content = fs.readFileSync(layoutPath, 'utf8');
  content = content.replace('onMenuClick={() => setIsSidebarOpen(true)}', 'onMenuClick={() => setIsSidebarOpen(prev => !prev)}');
  fs.writeFileSync(layoutPath, content);
  console.log('Patched DashboardLayout.jsx');
}

// 2. Patch Seeker Applications filters
const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx';
if (fs.existsSync(appsPath)) {
  let content = fs.readFileSync(appsPath, 'utf8');
  
  // Patch select widths
  const oldSelect = `className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  const newSelect = `className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  content = content.replace(new RegExp(oldSelect.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newSelect);

  // Patch wrapper container
  const oldContainer = `<div className="flex flex-wrap gap-4 items-center">`;
  const newContainer = `<div className="flex flex-col md:flex-row gap-4 w-full">`;
  content = content.replace(oldContainer, newContainer);
  
  // Make the search input wrapper full width on mobile
  const oldSearch = `<div className="relative flex-grow md:max-w-xs">`;
  const newSearch = `<div className="relative flex-grow w-full md:max-w-xs">`;
  content = content.replace(oldSearch, newSearch);

  fs.writeFileSync(appsPath, content);
  console.log('Patched Seeker Applications.jsx');
}

// 3. Patch Seeker Profile AI Analysis section
const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Profile.jsx';
if (fs.existsSync(profilePath)) {
  let content = fs.readFileSync(profilePath, 'utf8');
  
  // Change button flex wrapper
  const oldButton = `className="flex items-center justify-between w-full text-left focus:outline-none"`;
  const newButton = `className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full text-left focus:outline-none gap-3"`;
  content = content.replace(oldButton, newButton);
  
  // Change inner flex wrapper
  const oldInner = `<div className="flex items-center gap-2">`;
  const newInner = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">`;
  // Make sure we only replace the first occurrence or the one near Full AI Analysis
  // But wait, there might be other `<div className="flex items-center gap-2">`.
  // Let's use a targeted replace.
  const targetBlock = `<div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" /> Full AI Analysis
                      </span>`;
  const replacementBlock = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span className="font-bold text-gray-800 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" /> Full AI Analysis
                      </span>`;
  content = content.replace(targetBlock, replacementBlock);

  fs.writeFileSync(profilePath, content);
  console.log('Patched Seeker Profile.jsx');
}
