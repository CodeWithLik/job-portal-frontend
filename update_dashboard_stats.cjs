const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace calculation logic
const oldCalcRegex = /const totalApplicants = jobs\.reduce\(\(sum, job\) => sum \+ parseInt\(job\.applications_count \|\| 0\), 0\);/;
const newCalc = `const nonDeletedJobs = jobs.filter(job => job.status !== 'deleted' && job.status !== 'Deleted');
  const totalJobsCount = nonDeletedJobs.length;
  const activeJobsCount = jobs.filter(job => (job.status || '').toLowerCase() === 'active').length;
  const totalApplicants = nonDeletedJobs.reduce((sum, job) => sum + parseInt(job.applications_count || 0), 0);`;

content = content.replace(oldCalcRegex, newCalc);

// Replace grid logic
const oldGridRegex = /<div className="grid md:grid-cols-2 gap-6">[\s\S]*?<\/div>\s*<div>\s*<h2 className="text-xl font-bold text-gray-900 mb-4">All Job Postings<\/h2>/;

const newGrid = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Briefcase className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Jobs</p>
              <p className="text-2xl font-bold">{totalJobsCount}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="hover:border-emerald-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><TrendingUp className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Jobs</p>
              <p className="text-2xl font-bold">{activeJobsCount}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-indigo-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Users className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
              <p className="text-2xl font-bold">{totalApplicants}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Job Postings</h2>`;

content = content.replace(oldGridRegex, newGrid);

fs.writeFileSync(path, content);
console.log('Updated RecruiterDashboard with 3-card grid and calculated values');
