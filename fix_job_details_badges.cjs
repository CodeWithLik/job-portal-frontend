const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// --- Replace Badge Logic ---
const badgeRegex = /let applicationBadge = null;[\s\S]*?(const formatSalary = \(min, max\) => \{)/;

const newBadgeLogic = `const appStatusLower = (applicationStatus || '').toLowerCase();
  
  let applicationBadge = null;
  if (isSeeker && hasApplied) {
    let color = 'gray';
    if (appStatusLower === 'hired') color = 'success';
    else if (appStatusLower === 'interview') color = 'primary';
    else if (appStatusLower === 'rejected') color = 'error';
    
    const displayStatus = applicationStatus ? applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1) : 'Applied';
    
    applicationBadge = (
      <Badge variant={color} className="ml-2">
        My Status: {displayStatus}
      </Badge>
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

  if (isSeeker && hasApplied && appStatusLower === 'rejected') {
    // Suppress job cancellation badge if user is already rejected
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
                        <Button disabled className="w-full justify-center bg-red-50 text-red-700 border-red-200 opacity-100 cursor-default">
                          ✕ Rejected
                        </Button>
                      );
                    } else if (appStatusLower === 'hired') {
                      return (
                        <Button disabled className="w-full justify-center bg-green-50 text-green-700 border-green-200 opacity-100 cursor-default">
                          ✓ Hired
                        </Button>
                      );
                    } else if (appStatusLower === 'interview') {
                      return (
                        <Button disabled className="w-full justify-center bg-blue-50 text-blue-700 border-blue-200 opacity-100 cursor-default">
                          In Interview
                        </Button>
                      );
                    } else {
                      return (
                        <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-default">
                          ✓ Applied
                        </Button>
                      );
                    }
                  } else {
                    if (isDeleted) {
                      return (
                        <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                          Position Cancelled
                        </Button>
                      );
                    } else if (isClosed || isSuspended) {
                      return (
                        <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                          Position Closed
                        </Button>
                      );
                    } else if (isExpired) {
                      return (
                        <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                          This position has expired
                        </Button>
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
console.log('Fixed JobDetails button states and badges');
