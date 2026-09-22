const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Home.jsx', 'utf8');

content = content.replace(
  '<h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Provide</h2>',
  '<h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">What We Provide</h2>'
);

fs.writeFileSync('src/pages/public/Home.jsx', content);
console.log('Heading updated successfully');
