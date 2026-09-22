const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update lucide-react imports
content = content.replace(
  "import { Search, Loader2 } from 'lucide-react';",
  "import { Search, Loader2, ChevronUp } from 'lucide-react';"
);

// 2. Replace the UI block
const oldBlockRegex = /<div className="pt-4 border-t border-gray-100 mt-4">[\s\S]*?<\/div>\s*<\/div>/;

const newBlock = `<div className="pt-6 border-t border-gray-100 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-900 text-sm">Salary Range</h4>
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  </div>
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

if (oldBlockRegex.test(content)) {
  content = content.replace(oldBlockRegex, newBlock);
  fs.writeFileSync(path, content);
  console.log("Successfully restyled Salary UI!");
} else {
  console.log("Could not find the target regex.");
}
