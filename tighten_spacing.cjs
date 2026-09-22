const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

// Reduce bottom padding on the main content container (from py-16 to pt-16 pb-8)
content = content.replace(
  'py-16 w-full space-y-24 text-pretty',
  'pt-16 pb-8 w-full space-y-24 text-pretty'
);

// Reduce top padding on the CTA section (from py-20 to pt-12 pb-20)
content = content.replace(
  'className="w-full bg-slate-50 py-20 border-t border-slate-100"',
  'className="w-full bg-slate-50 pt-12 pb-20 border-t border-slate-100"'
);

// Keep standard spacing between headline and buttons (mb-8 is standard, we'll keep it mb-8)

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Tightened CTA spacing');
