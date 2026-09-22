const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Revert lucide-react imports
content = content.replace(
  "import { Search, Loader2, ChevronUp } from 'lucide-react';",
  "import { Search, Loader2 } from 'lucide-react';"
);

// 2. Revert the UI block
const regex = /<div className="pt-6 border-t border-gray-100 mt-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const oldBlock = `<div className="pt-4 border-t border-gray-100 mt-4">
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
                </div>`;

if (regex.test(content)) {
  content = content.replace(regex, oldBlock);
  fs.writeFileSync(path, content);
  console.log("Successfully reverted Salary UI!");
} else {
  console.log("Could not find the target regex.");
}
