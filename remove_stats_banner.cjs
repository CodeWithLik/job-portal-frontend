const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', 'utf8');

const targetToRemove = `      {/* Impact Stats Banner */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-32">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center mb-8">Trusted by growing teams & thousands of talent</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex flex-col items-center justify-center border-r border-gray-100 last:border-0 md:border-r">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">98%</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Match Accuracy</span>
          </div>
          <div className="flex flex-col items-center justify-center border-r-0 md:border-r border-gray-100">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">50k+</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Users</span>
          </div>
          <div className="flex flex-col items-center justify-center border-r border-gray-100 md:border-r pt-8 border-t md:border-t-0 md:pt-0">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">10k+</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Companies</span>
          </div>
          <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-100 md:border-t-0 md:pt-0">
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">24/7</span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">AI Parsing</span>
          </div>
        </div>
      </div>`;

content = content.replace(targetToRemove, '');

// Restore original padding
content = content.replace('className="flex gap-4 mb-20 justify-center"', 'className="flex gap-4 mb-24 justify-center"');

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', content);
console.log('Removed stats banner');
