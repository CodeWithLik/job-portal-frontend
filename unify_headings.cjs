const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', 'utf8');

const oldSection = `      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">What We Provide</h2>`;

const newSection = `      <div className="w-full max-w-7xl mx-auto px-4 text-center">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">CORE FEATURES</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">What We Provide</h2>`;

content = content.replace(oldSection, newSection);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', content);
console.log('Unified heading styles');
