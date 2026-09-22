const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Contact.jsx', 'utf8');

// The exact string to replace is a bit long, so I'll use regex to replace the whole left column div content
const leftColRegex = /{[\s\S]*?Left Column: Direct Channels & Quick Answers[\s\S]*?<div className="lg:col-span-5 space-y-10">[\s\S]*?<div className="pt-8 border-t border-slate-200">/;

const newLeftCol = `{/* Left Column: Quick Answers */}
        <div className="lg:col-span-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Quick Help</h3>
            <p className="text-slate-500 text-sm mb-8">
              Find quick answers to common platform questions before reaching out.
            </p>`;

content = content.replace(leftColRegex, newLeftCol);

// Increase spacing between FAQ items
content = content.replace('<div className="space-y-1">', '<div className="space-y-3">');

// Also remove unused icons from imports (Mail, Clock, MapPin)
content = content.replace('Mail, Clock, MapPin, ', '');

fs.writeFileSync('src/pages/public/Contact.jsx', content);
console.log('Left column cleaned up');
