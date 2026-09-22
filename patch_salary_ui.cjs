const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                  </div>
                </div>
              </div>`;
              
const replaceStr = `                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range ($)</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      className="w-full text-sm py-1.5"
                    />
                    <span className="text-gray-400">-</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      className="w-full text-sm py-1.5"
                    />
                  </div>
                </div>

              </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log("Successfully injected Salary UI!");
} else {
  console.log("Could not find the target string.");
}
