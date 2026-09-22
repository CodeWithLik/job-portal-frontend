const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

const oldFooter = `{/* Minimal Dashboard Footer Strip */}
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
        </div>`;

const newFooter = `{/* Minimal Dashboard Footer Strip */}
        <div className="mt-auto pt-6 w-full max-w-6xl mx-auto">
          <div className="border-t border-slate-200/60 py-6 flex items-center justify-center text-xs font-normal text-slate-500 select-none">
            <span>&copy; {new Date().getFullYear()} AI Job Portal. All rights reserved.</span>
            <span className="mx-3 text-slate-300">&middot;</span>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <span className="mx-3 text-slate-300">&middot;</span>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            
            {role !== 'admin' && (
              <>
                <span className="mx-3 text-slate-300">&middot;</span>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">Support</Link>
              </>
            )}
          </div>
        </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Updated Dashboard footer styling');
