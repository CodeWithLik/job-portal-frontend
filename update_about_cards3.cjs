const fs = require('fs');
let content = fs.readFileSync('src/pages/public/About.jsx', 'utf8');

// Update Mission Card Container
content = content.replace(
  /<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">/g,
  '<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">'
);

// Update Icon Containers
content = content.replace(
  /<div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">/g,
  '<div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">'
);

content = content.replace('<Target className="h-8 w-8 text-blue-600" />', '<Target className="h-8 w-8" />');
content = content.replace('<Eye className="h-8 w-8 text-blue-600" />', '<Eye className="h-8 w-8" />');

// Easiest is just a targeted string replacement for the quotes.
content = content.replace('"To become the', 'To become the');
content = content.replace('of work."', 'of work.');

content = content.replace('"To transform Africa', 'To transform Africa');
content = content.replace('precision."', 'precision.');


fs.writeFileSync('src/pages/public/About.jsx', content);
console.log('About cards updated');
