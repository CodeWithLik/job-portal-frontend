const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', 'utf8');

const injectionTarget = `      <div className="flex gap-4 mb-24 justify-center">
        <Link to="/jobs"><Button className="px-8 py-3 text-lg">Browse Jobs</Button></Link>
        <Button variant="outline" className="px-8 py-3 text-lg" onClick={handlePostJobClick}>Post a Job</Button>
      </div>`;

const newSection = `      <div className="flex gap-4 mb-24 justify-center">
        <Link to="/jobs"><Button className="px-8 py-3 text-lg">Browse Jobs</Button></Link>
        <Button variant="outline" className="px-8 py-3 text-lg" onClick={handlePostJobClick}>Post a Job</Button>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-32 text-center">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">HOW IT WORKS</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">How AI Job Portal Works</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
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

        </div>
      </div>`;

content = content.replace(injectionTarget, newSection);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Home.jsx', content);
console.log('Added How It Works section to Home.jsx');
