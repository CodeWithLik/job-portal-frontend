const fs = require('fs');

const savedJobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(savedJobsPath, 'utf8');

const regex = /<CardBody className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">[\s\S]*?<\/CardBody>/;

const revertedCardBody = `<CardBody className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        <Link to={getJobLink(job.id)} className="hover:text-blue-600">{job.title}</Link>
                      </h2>
                      <p className="text-gray-600 font-medium mb-4">{job.company}</p>
                      
                      <div className="flex gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.employment_type}</span>
                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
  
                      <div className="flex gap-3 items-center">
                        {job.application_status ? (
                          <Button variant="secondary" disabled className="opacity-100 cursor-default">
                            ✓ {job.application_status.charAt(0).toUpperCase() + job.application_status.slice(1)}
                          </Button>
                        ) : (
                          <Link to={getJobLink(job.id)}>
                            <Button>Apply Now</Button>
                          </Link>
                        )}
                        <Button variant="outline" onClick={() => handleRemove(job.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>`;

content = content.replace(regex, revertedCardBody);
fs.writeFileSync(savedJobsPath, content);
console.log('Reverted SavedJobs.jsx layout');
