const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { Outlet, Navigate, useLocation } from 'react-router-dom';",
  "import { useState } from 'react';\nimport { Outlet, Navigate, useLocation } from 'react-router-dom';"
);

content = content.replace(
  "export const DashboardLayout = ({ role, links }) => {",
  "export const DashboardLayout = ({ role, links }) => {\n  const [isSidebarOpen, setIsSidebarOpen] = useState(false);"
);

content = content.replace(
  "<Navbar userRole={role} />",
  "<Navbar userRole={role} onMenuClick={() => setIsSidebarOpen(true)} />"
);

content = content.replace(
  "<Sidebar links={links} />",
  "<Sidebar links={links} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />"
);

content = content.replace(
  '<main className="ml-64 p-8 min-h-[calc(100vh-4rem)] flex flex-col">',
  '<main className="md:ml-64 p-4 sm:p-8 min-h-[calc(100vh-4rem)] flex flex-col transition-all duration-300 w-full md:w-[calc(100%-16rem)]">'
);

fs.writeFileSync(path, content);
console.log('DashboardLayout updated');
