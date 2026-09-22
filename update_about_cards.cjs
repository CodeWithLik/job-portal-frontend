const fs = require('fs');
let content = fs.readFileSync('src/pages/public/About.jsx', 'utf8');

// Update Mission Card Container
content = content.replace(
  '<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">',
  '<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">'
);
// Make sure it updates both cards! Wait, replace only replaces the first occurrence unless regex is used.
content = content.replace(
  '<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">',
  '<div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">'
);

// Update Icon Containers
content = content.replace(
  '<div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">',
  '<div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">'
);
content = content.replace(
  '<div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">',
  '<div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">'
);

// Note: Target and Eye icons had text-blue-600 class explicitly, which might override the group-hover text color. We need to remove text-blue-600 from the icons.
content = content.replace('<Target className="h-8 w-8 text-blue-600" />', '<Target className="h-8 w-8" />');
content = content.replace('<Eye className="h-8 w-8 text-blue-600" />', '<Eye className="h-8 w-8" />');


// Remove Quotes from Mission Text
content = content.replace(
  '"To become the leading platform driving Africa\\'s economic growth by building an intelligent, trusted ecosystem that connects the continent\\'s finest talent with its most innovative employers, shaping a dynamic, inclusive, and efficient future of work."',
  'To become the leading platform driving Africa\\'s economic growth by building an intelligent, trusted ecosystem that connects the continent\\'s finest talent with its most innovative employers, shaping a dynamic, inclusive, and efficient future of work.'
);

// Remove Quotes from Vision Text
content = content.replace(
  `"To transform Africa's job market through an advanced, AI-powered platform that removes hiring friction by delivering smart, seamless, and accessible tools—empowering individuals to showcase their potential and enabling organizations to find the right talent with speed and precision."`,
  `To transform Africa's job market through an advanced, AI-powered platform that removes hiring friction by delivering smart, seamless, and accessible tools—empowering individuals to showcase their potential and enabling organizations to find the right talent with speed and precision.`
);
content = content.replace(
  `"To transform Africa's job market through an advanced, AI-powered platform that removes hiring friction by delivering smart, seamless, and accessible tools?"empowering individuals to showcase their potential and enabling organizations to find the right talent with speed and precision."`,
  `To transform Africa's job market through an advanced, AI-powered platform that removes hiring friction by delivering smart, seamless, and accessible tools—empowering individuals to showcase their potential and enabling organizations to find the right talent with speed and precision.`
); // Fallback for weird encoding issues

fs.writeFileSync('src/pages/public/About.jsx', content);
console.log('About cards updated with hover motion and no quotes');
