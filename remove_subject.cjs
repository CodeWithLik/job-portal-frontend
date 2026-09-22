const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Contact.jsx', 'utf8');

// The regex previously failed, let's just do a string replacement.
const subjectBlock = `                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief summary of your request"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>`;

content = content.replace(subjectBlock, '');

// State cleanups (in case they didn't work)
content = content.replace(/,\s*subject:\s*''/g, '');

fs.writeFileSync('src/pages/public/Contact.jsx', content);
console.log('Subject removed completely');
