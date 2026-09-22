const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

// 1. Match Header Title Font Size and Banner Padding
content = content.replace(
  'py-8 px-4 sm:px-6',
  'py-10 px-4 sm:px-6'
);

content = content.replace(
  '<h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Contact Support</h1>',
  '<h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Contact Support</h1>'
);

// 2. Align "Quick Help" and "Send Us a Message" Headings
// Make them identical: text-2xl font-bold text-slate-900 mb-2
content = content.replace(
  '<h2 className="text-xl font-bold text-slate-900 mb-1">Send Us a Message</h2>',
  '<h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>'
);

content = content.replace(
  '<p className="text-xs text-slate-500 mb-6">Fill out the form below and our team will get back to you promptly.</p>',
  '<p className="text-sm text-slate-500 mb-8">Fill out the form below and our team will get back to you promptly.</p>'
);

// Add pt-8 to the Left Column so it aligns with the p-8 in the Right Column card
content = content.replace(
  '{/* Left Column: Quick Answers */}\n        <div className="lg:col-span-5">\n          <div>',
  '{/* Left Column: Quick Answers */}\n        <div className="lg:col-span-5 pt-8">\n          <div>'
);

// Check if that exact replace worked, if not, do it differently
if (!content.includes('lg:col-span-5 pt-8')) {
    content = content.replace(
      '<div className="lg:col-span-5">',
      '<div className="lg:col-span-5 pt-8">'
    );
}

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', content);
console.log('Typography and alignment fixed!');
