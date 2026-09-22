const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

if (!content.includes('import { Footer }')) {
  content = content.replace(
    "import { Loader2 } from 'lucide-react';",
    "import { Loader2, ShieldAlert } from 'lucide-react';\nimport { Footer } from '../components/common/Footer';\nimport { Link } from 'react-router-dom';\nimport { Button } from '../components/common/Button';"
  );
}

// Implement RBAC Restricted Access View
const rbAcLogic = `  if (role && user.role !== role) {
    const isSeekerPage = role === 'seeker';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Restricted</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {isSeekerPage 
              ? "This section is exclusively for Job Seekers. Only candidate accounts can manage applications and access AI resume analysis."
              : "This section is exclusively for Employers and Recruiters. Only employer accounts can post jobs and review applicants."}
          </p>
          <div className="flex flex-col gap-3">
            <Link to={\`/\${user.role}/dashboard\`}>
              <Button className="w-full py-2.5">Go to My Dashboard</Button>
            </Link>
            <Link to="/login" onClick={() => localStorage.removeItem('token')}>
              <Button variant="outline" className="w-full py-2.5">Log Out / Switch Account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }`;

content = content.replace(
  `  if (role && user.role !== role) {
    return <Navigate to={\`/\${user.role}/dashboard\`} replace />;
  }`,
  rbAcLogic
);

// Add footer
const oldMain = `      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>`;

const newMain = `      <main className="ml-64 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-grow p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </main>`;

content = content.replace(oldMain, newMain);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('DashboardLayout updated with RBAC and Footer');
