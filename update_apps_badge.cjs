const fs = require('fs');

const appsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx';
let content = fs.readFileSync(appsPath, 'utf8');

const oldBadge = '<AppStatusBadge status={app.status} />';
const newBadge = `{(() => {
                        const isDeleted = app.job_is_deleted || app.job_status === 'Deleted' || app.job_status === 'deleted';
                        const appStatusLower = (app.status || '').toLowerCase();
                        
                        if (isDeleted && appStatusLower !== 'hired' && appStatusLower !== 'rejected') {
                          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">Position Cancelled</span>;
                        }
                        return <AppStatusBadge status={app.status} />;
                      })()}`;

content = content.replace(oldBadge, newBadge);

fs.writeFileSync(appsPath, content);
console.log('Updated Applications.jsx badge logic');
