const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove green from New Jobs
const newJobsOld = '<KPICard icon={<Briefcase className="text-green-600 group-hover:text-white transition-colors" />} label="New Jobs"';
const newJobsNew = '<KPICard icon={<Briefcase />} label="New Jobs"';
content = content.replace(newJobsOld, newJobsNew);

// 2. Add green to Applications
const appsOld = '<KPICard icon={<FileText />} label="Applications"';
const appsNew = '<KPICard icon={<FileText className="text-green-600 group-hover:text-white transition-colors" />} label="Applications"';
content = content.replace(appsOld, appsNew);

fs.writeFileSync(path, content);
console.log('Successfully swapped colors between cards manually');
