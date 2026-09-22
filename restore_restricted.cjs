const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

// Ensure ShieldAlert and Button are imported
if (!content.includes('ShieldAlert')) {
  content = content.replace(
    "import { Loader2 } from 'lucide-react';",
    "import { Loader2, ShieldAlert } from 'lucide-react';"
  );
}

if (!content.includes("import { Button }")) {
  content = content.replace(
    "import { Link } from 'react-router-dom';",
    "import { Link } from 'react-router-dom';\nimport { Button } from '../components/common/Button';"
  );
}

const oldRedirect = `  if (role && user.role !== role) {
    return <Navigate to={\`/\${user.role}/dashboard\`} replace />;
  }`;

const newRestricted = `  if (role && user.role !== role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Restricted</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {role === 'seeker' 
              ? "This section is exclusively for Job Seekers. Only candidate accounts can manage applications and access AI resume analysis."
              : role === 'recruiter'
              ? "This section is exclusively for Employers and Recruiters. Only employer accounts can post jobs and review applicants."
              : "This section requires Administrator privileges to access."}
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

content = content.replace(oldRedirect, newRestricted);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Restored Access Restricted screen');
