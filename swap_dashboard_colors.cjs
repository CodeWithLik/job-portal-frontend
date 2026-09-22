const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `          <KPICard icon={<Briefcase />} label="Total Jobs" value={(stats?.totalJobs || 0).toLocaleString()} />
          <KPICard icon={<Briefcase className="text-green-600 group-hover:text-white transition-colors" />} label="New Jobs" value={(stats?.newJobs || 0).toLocaleString()} trend={stats?.newJobsGrowth} />
          <KPICard icon={<FileText />} label="Applications" value={(stats?.applications || 0).toLocaleString()} trend={stats?.applicationsGrowth} />`;

const replaceStr = `          <KPICard icon={<Briefcase />} label="Total Jobs" value={(stats?.totalJobs || 0).toLocaleString()} />
          <KPICard icon={<Briefcase />} label="New Jobs" value={(stats?.newJobs || 0).toLocaleString()} trend={stats?.newJobsGrowth} />
          <KPICard icon={<FileText className="text-green-600 group-hover:text-white transition-colors" />} label="Applications" value={(stats?.applications || 0).toLocaleString()} trend={stats?.applicationsGrowth} />`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully swapped colors between New Jobs and Applications cards');
} else {
  console.log('Could not find the target string pattern in Dashboard.jsx');
}
