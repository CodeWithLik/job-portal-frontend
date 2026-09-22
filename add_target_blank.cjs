const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

content = content.replace(
  '<Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>',
  '<Link to="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Privacy</Link>'
);

content = content.replace(
  '<Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>',
  '<Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Terms</Link>'
);

content = content.replace(
  '<Link to="/contact" className="hover:text-slate-900 transition-colors">Support</Link>',
  '<Link to="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Support</Link>'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Added target="_blank" to dashboard legal links');
