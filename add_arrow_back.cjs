const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\ResetPassword.jsx', 'utf8');

// Ensure ArrowLeft is imported
if (!content.includes('ArrowLeft')) {
  content = content.replace(
    'AlertTriangle, CheckCircle, XCircle',
    'AlertTriangle, CheckCircle, XCircle, ArrowLeft'
  );
}

const oldLink = `<Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Back to Login
                </Link>`;

const newLink = `<Link to="/login" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>`;

content = content.replace(oldLink, newLink);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\ResetPassword.jsx', content);
console.log('Added ArrowLeft to Back to Login link');
