const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div className="bg-white p-6 rounded-lg border border-gray-200">\s*<h3 className="font-bold text-lg mb-4">Filters<\/h3>[\s\S]*?<div className="md:col-span-3 space-y-4">/;

const newBlock = `<div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => handleJobTypeChange(type)}
                      /> 
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Salary Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Min Salary</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      wrapperClassName="m-0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Max Salary</label>
                    <Input 
                      type="number" 
                      placeholder="No limit" 
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      wrapperClassName="m-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync(path, content);
  console.log("Successfully fixed tags!");
} else {
  console.log("Regex not found");
}
