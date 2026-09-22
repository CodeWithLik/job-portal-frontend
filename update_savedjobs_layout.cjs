const fs = require('fs');
const savedJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(savedJobsPath, 'utf8');

const oldCardBody = /<CardBody className="p-6">[\s\S]*?<\/CardBody>/g;

const newCardBody = `<CardBody className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        <Link to={getJobLink(job.id)} className="hover:text-blue-600">{job.title}</Link>
                      </h2>
                      {job.application_status && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          My Status: {job.application_status.charAt(0).toUpperCase() + job.application_status.slice(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium mb-3">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</div>
                      <div className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.employment_type}</div>
                      <div className="flex items-center gap-1">Posted {new Date(job.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 md:mt-0">
                    <Link to={getJobLink(job.id)}>
                      {job.application_status ? (
                        <Button variant="outline">View Job</Button>
                      ) : (
                        <Button variant="primary">Apply Now</Button>
                      )}
                    </Link>
                    <Button variant="outline" onClick={() => handleRemove(job.id)} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      Remove
                    </Button>
                  </div>
                </CardBody>`;

content = content.replace(oldCardBody, newCardBody);
fs.writeFileSync(savedJobsPath, content);
console.log('Updated SavedJobs.jsx card layout');
