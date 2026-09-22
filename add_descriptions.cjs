const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', 'utf8');

const oldGrid = `        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Step 01 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className="text-5xl font-black text-blue-600 mb-6">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Account</h3>
            <p className="text-gray-500 text-sm">.</p>
          </div>

          {/* Step 02 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className="text-5xl font-black text-blue-600 mb-6">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Your CV</h3>
          </div>

          {/* Step 03 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className="text-5xl font-black text-blue-600 mb-6">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Search & Save</h3>
          </div>

          {/* Step 04 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className="text-5xl font-black text-blue-600 mb-6">04</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Apply & Track</h3>
          </div>

        </div>`;

const newGrid = `        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Step 01 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Account</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Sign up as a job seeker or employer to access your personalized portal.</p>
          </div>

          {/* Step 02 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Your CV</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Upload your PDF resume to extract skills and receive AI strength feedback.</p>
          </div>

          {/* Step 03 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Search & Save</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Explore active openings, apply filters, and bookmark your top roles.</p>
          </div>

          {/* Step 04 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">04</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Apply & Track</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Submit direct applications and follow your review status in real time.</p>
          </div>

        </div>`;

content = content.replace(oldGrid, newGrid);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', content);
console.log('Added descriptions to How It Works section');
