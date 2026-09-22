const fs = require('fs');

const savedJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(savedJobsPath, 'utf8');

// Add Trash2 to lucide imports
content = content.replace(
  "import { Bookmark, MapPin, Briefcase, Loader2 } from 'lucide-react';",
  "import { Bookmark, MapPin, Briefcase, Loader2, Trash2 } from 'lucide-react';"
);

// We need to replace the entire CardBody and map function.
const oldBlockRegex = /\{savedJobs\.map\(job => \([\s\S]*?<\/CardBody>\s*<\/Card>\s*\)\)\}/;

const newBlock = `{savedJobs.map(job => {
            const isDeleted = job.is_deleted || job.status === 'Deleted' || job.status === 'deleted';
            const isClosed = job.status === 'Closed' || job.status === 'closed';
            const isSuspended = job.status === 'Suspended' || job.status === 'suspended';
            
            let isExpired = job.status === 'Expired' || isDeleted;
            if (job.expires_at) {
              const daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
              isExpired = isExpired || daysLeft < 0;
            }

            const appStatusLower = (job.application_status || '').toLowerCase();
            let badge = null;

            const bColors = {
              applied: "bg-gray-100 text-gray-800",
              shortlisted: "bg-yellow-100 text-yellow-800",
              interview: "bg-indigo-100 text-indigo-800",
              hired: "bg-green-100 text-green-800",
              rejected: "bg-red-100 text-red-800",
              closed: "bg-amber-50 text-amber-700 border border-amber-200/60",
              cancelled: "bg-rose-50 text-rose-700 border border-rose-200/60",
            };

            const makeBadge = (text, cls) => (
              <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 \${cls}\`}>
                {text}
              </span>
            );

            if (job.application_status) {
              const displayStatus = job.application_status.charAt(0).toUpperCase() + job.application_status.slice(1);
              if (appStatusLower === 'hired') {
                badge = makeBadge(\`My Status: Hired\`, bColors.hired);
              } else if (appStatusLower === 'rejected') {
                badge = makeBadge(\`My Status: Rejected\`, bColors.rejected);
              } else if (isDeleted) {
                badge = makeBadge(\`Position Cancelled\`, bColors.cancelled);
              } else if (appStatusLower === 'interview') {
                badge = makeBadge(\`My Status: Interview\`, bColors.interview);
              } else if (appStatusLower === 'shortlisted') {
                badge = makeBadge(\`My Status: Shortlisted\`, bColors.shortlisted);
              } else {
                badge = makeBadge(\`My Status: \${displayStatus}\`, bColors.applied);
              }
            } else {
              // Not applied
              if (isDeleted) {
                badge = makeBadge(\`Position Cancelled\`, bColors.cancelled);
              } else if (isClosed) {
                badge = makeBadge(\`Closed\`, bColors.closed);
              } else if (isSuspended) {
                badge = makeBadge(\`Suspended\`, "bg-red-100 text-red-700");
              } else if (isExpired) {
                badge = makeBadge(\`Expired\`, "bg-red-100 text-red-700");
              }
            }

            return (
              <Card key={job.id} className="hover:border-blue-200 transition-colors">
                <CardBody className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        <Link to={getJobLink(job.id)} className="hover:text-blue-600">{job.title}</Link>
                      </h2>
                      {badge}
                    </div>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>

                  <div className="flex gap-4 items-center mt-4 md:mt-0">
                    <Link to={getJobLink(job.id)}>
                      <Button variant="outline">View Job</Button>
                    </Link>
                    <button 
                      onClick={() => handleRemove(job.id)} 
                      className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50" 
                      title="Remove from saved jobs"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </CardBody>
              </Card>
            );
          })}`;

content = content.replace(oldBlockRegex, newBlock);

fs.writeFileSync(savedJobsPath, content);
console.log('Updated SavedJobs.jsx card layout and badge logic');
