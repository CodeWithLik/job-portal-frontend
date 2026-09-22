const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

const regex = /{?\/\*\s*Bottom CTA Section\s*\*\/}?\s*<div className="my-12 bg-gradient-to-br from-blue-50 via-indigo-50\/50 to-blue-100\/60 border border-blue-200\/60 rounded-3xl p-12 text-center shadow-sm">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newSection = `      </div>

      {/* Bottom CTA Section (Full Width) */}
      <div className="w-full bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-slate-900 font-extrabold text-3xl sm:text-4xl tracking-tight mb-8">
            Ready to experience a better way to hire and be hired?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-0 rounded-md">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/recruiter/post-job">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg font-medium bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm rounded-md">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>`;

content = content.replace(regex, newSection);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Refactored About.jsx CTA section');
