const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

if (!content.includes('import { Link }')) {
  content = content.replace(
    "import { Loader2 } from 'lucide-react';",
    "import { Loader2 } from 'lucide-react';\nimport { Link } from 'react-router-dom';"
  );
}

const oldMain = `      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>`;

const newMain = `      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-grow">
          <Outlet />
        </div>
        
        {/* Minimal Dashboard Footer Strip */}
        <div className="mt-auto pt-10 pb-2 w-full max-w-6xl mx-auto flex items-center justify-center text-xs text-slate-400 select-none">
          <span>&copy; {new Date().getFullYear()} AI Job Portal</span>
          <span className="mx-2 text-slate-300">&middot;</span>
          <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
          <span className="mx-2 text-slate-300">&middot;</span>
          <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
          
          {role !== 'admin' && (
            <>
              <span className="mx-2 text-slate-300">&middot;</span>
              <Link to="/contact" className="hover:text-slate-600 transition-colors">Support</Link>
            </>
          )}
        </div>
      </main>`;

content = content.replace(oldMain, newMain);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Added minimal dashboard footer strip');
