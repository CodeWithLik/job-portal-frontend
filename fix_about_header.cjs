const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

const regex = /<div className="flex-grow flex flex-col bg-gray-50">[\s\S]*?{?\/\* Top Header Banner \*\/}?[\s\S]*?<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 py-10 px-4 relative overflow-hidden">[\s\S]*?<div className="absolute inset-0 opacity-20 pointer-events-none bg-\[url\('https:\/\/www\.transparenttextures\.com\/patterns\/cubes\.png'\)\]" \/>[\s\S]*?<div className="max-w-7xl mx-auto relative z-10">/g;

const newHeaderBlock = `<div className="flex-grow flex flex-col bg-slate-50 min-h-screen">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 border-b border-slate-100 py-10 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">`;

content = content.replace(regex, newHeaderBlock);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Fixed About.jsx header background');
