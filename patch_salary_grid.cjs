const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div className="pt-4 border-t border-gray-100 mt-4">[\s\S]*?<\/div>\s*<\/div>/;

const newBlock = `<div className="pt-4 border-t border-gray-100 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Salary Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Min Salary</label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        className="w-full text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Max Salary</label>
                      <Input 
                        type="number" 
                        placeholder="No limit" 
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        className="w-full text-sm py-2"
                      />
                    </div>
                  </div>
                </div>`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync(path, content);
  console.log("Successfully applied new grid layout to Salary UI!");
} else {
  console.log("Could not find the target regex.");
}
