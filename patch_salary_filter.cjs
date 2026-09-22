const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add states
content = content.replace(
  "const [selectedJobTypes, setSelectedJobTypes] = useState([]);",
  "const [selectedJobTypes, setSelectedJobTypes] = useState([]);\n  const [minSalary, setMinSalary] = useState('');\n  const [maxSalary, setMaxSalary] = useState('');"
);

// 2. Add reset pagination trigger
content = content.replace(
  "  }, [searchTerm, selectedJobTypes]);",
  "  }, [searchTerm, selectedJobTypes, minSalary, maxSalary]);"
);

// 3. Add filter logic
const oldFilter = `const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.employment_type);

    return matchesSearch && matchesType;
  });`;

const newFilter = `const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.employment_type);
    
    let matchesSalary = true;
    const filterMin = minSalary ? Number(minSalary) : null;
    const filterMax = maxSalary ? Number(maxSalary) : null;
    
    if (filterMin !== null || filterMax !== null) {
      if (job.salary_min == null && job.salary_max == null) {
        matchesSalary = false;
      } else {
        const jMin = job.salary_min != null ? Number(job.salary_min) : 0;
        const jMax = job.salary_max != null ? Number(job.salary_max) : Infinity;
        
        if (filterMin !== null && jMax < filterMin) matchesSalary = false;
        if (filterMax !== null && jMin > filterMax) matchesSalary = false;
      }
    }

    return matchesSearch && matchesType && matchesSalary;
  });`;

content = content.replace(oldFilter, newFilter);

// 4. Add UI for filters
const oldUI = `                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <div className="space-y-2">`;
                  
const newUI = `                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range ($)</label>
                  <div className="flex items-center gap-2 mb-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <div className="space-y-2">`;

content = content.replace(oldUI, newUI);

fs.writeFileSync(path, content);
console.log('Successfully added Salary Filter to FindJobs.jsx');
