const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// --- Replace Badge Logic ---
const badgeRegex = /const appStatusLower = \(applicationStatus \|\| ''\)\.toLowerCase\(\);[\s\S]*?(const formatSalary = \(min, max\) => \{)/;

const newBadgeLogic = `const appStatusLower = (applicationStatus || '').toLowerCase();
  
  let applicationBadge = null;
  let statusColorClasses = "bg-gray-100 text-gray-800"; // default applied
  
  if (isSeeker && hasApplied) {
    if (appStatusLower === 'hired') statusColorClasses = 'bg-green-100 text-green-800';
    else if (appStatusLower === 'interview') statusColorClasses = 'bg-indigo-100 text-indigo-800';
    else if (appStatusLower === 'shortlisted') statusColorClasses = 'bg-yellow-100 text-yellow-800';
    else if (appStatusLower === 'rejected') statusColorClasses = 'bg-red-100 text-red-800';
    
    const displayStatus = applicationStatus ? applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1) : 'Applied';
    
    applicationBadge = (
      <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 \${statusColorClasses}\`}>
        My Status: {displayStatus}
      </span>
    );
  }

  let expirationBadge = null;
  const isDeleted = job.is_deleted || job.status === 'Deleted' || job.status === 'deleted';
  const isClosed = job.status === 'Closed' || job.status === 'closed';
  const isSuspended = job.status === 'Suspended' || job.status === 'suspended';
  const isActive = job.status === 'Active' || job.status === 'active' || job.status === 'Published' || job.status === 'published';
  
  let isExpired = job.status === 'Expired' || isDeleted;
  let daysLeft = null;
  
  if (job.expires_at) {
    daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    isExpired = isExpired || daysLeft < 0;
  }

  if (isSeeker && hasApplied) {
    // Suppress all expiration/cancellation badges if user has applied (user status takes priority)
  } else if (isDeleted) {
    expirationBadge = <Badge variant="error">Position Cancelled</Badge>;
  } else if (isClosed) {
    expirationBadge = <Badge variant="gray">Closed</Badge>;
  } else if (isSuspended) {
    expirationBadge = <Badge variant="error">Suspended</Badge>;
  } else if (isExpired) {
    expirationBadge = <Badge variant="danger">Expired</Badge>;
  } else if (isActive && !hasApplied && daysLeft !== null) {
    if (daysLeft === 0) {
      expirationBadge = <Badge variant="warning">Expires today</Badge>;
    } else if (daysLeft === 1) {
      expirationBadge = <Badge variant="warning">1 day left</Badge>;
    } else if (daysLeft > 1) {
      expirationBadge = <Badge variant="primary">{daysLeft} days left</Badge>;
    }
  }

  $1`;

content = content.replace(badgeRegex, newBadgeLogic);

// --- Replace Button Logic ---
const buttonRegex = /<div className="flex flex-col gap-3 min-w-\[140px\]">[\s\S]*?\{isSeeker && \(/;

const newButtonLogic = `<div className="flex flex-col gap-3 min-w-[140px]">
                {(() => {
                  if (isSeeker && hasApplied) {
                    if (appStatusLower === 'rejected') {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-red-100 text-red-800 cursor-default">
                          ✕ Rejected
                        </div>
                      );
                    } else if (appStatusLower === 'hired') {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-green-100 text-green-800 cursor-default">
                          ✓ Hired
                        </div>
                      );
                    } else if (appStatusLower === 'interview') {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-indigo-100 text-indigo-800 cursor-default">
                          In Interview
                        </div>
                      );
                    } else if (appStatusLower === 'shortlisted') {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-yellow-100 text-yellow-800 cursor-default">
                          Shortlisted
                        </div>
                      );
                    } else {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-800 cursor-default">
                          ✓ Applied
                        </div>
                      );
                    }
                  } else {
                    if (isDeleted) {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-500 cursor-default">
                          Position Cancelled
                        </div>
                      );
                    } else if (isClosed || isSuspended) {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-500 cursor-default">
                          Position Closed
                        </div>
                      );
                    } else if (isExpired) {
                      return (
                        <div className="w-full text-center px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-500 cursor-default">
                          This position has expired
                        </div>
                      );
                    } else {
                      return (
                        <Button onClick={openApplicationModal} disabled={isApplying || loadingProfile} className="w-full justify-center">
                          {isApplying || loadingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply Now'}
                        </Button>
                      );
                    }
                  }
                })()}
                {isSeeker && (`;

content = content.replace(buttonRegex, newButtonLogic);

fs.writeFileSync(jobDetailsPath, content);
console.log('Fixed JobDetails buttons and colors');
