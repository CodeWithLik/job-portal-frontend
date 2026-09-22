const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

const logicRegex = /const appStatusLower = \(applicationStatus \|\| ''\)\.toLowerCase\(\);[\s\S]*?(<div className="flex flex-col gap-3 min-w-\[140px\]">)[\s\S]*?\{isSeeker && \(/;

const newLogic = `const appStatusLower = (applicationStatus || '').toLowerCase();
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

  let singleBadge = null;
  let primaryButton = null;

  const bColors = {
    applied: "bg-gray-100 text-gray-800",
    shortlisted: "bg-yellow-100 text-yellow-800",
    interview: "bg-indigo-100 text-indigo-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    closed: "bg-amber-100 text-amber-800",
    cancelled: "bg-gray-100 text-gray-500",
  };

  const makeBadge = (text, cls) => (
    <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 \${cls}\`}>
      {text}
    </span>
  );

  const makeBtn = (text, cls) => (
    <div className={\`w-full text-center px-4 py-2 rounded-md font-medium cursor-default \${cls}\`}>
      {text}
    </div>
  );

  if (isSeeker && hasApplied) {
    const displayStatus = applicationStatus ? applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1) : 'Applied';
    
    if (appStatusLower === 'hired') {
      singleBadge = makeBadge(\`My Status: Hired\`, bColors.hired);
      primaryButton = makeBtn(\`✓ Hired\`, bColors.hired);
    } else if (appStatusLower === 'rejected') {
      singleBadge = makeBadge(\`My Status: Rejected\`, bColors.rejected);
      primaryButton = makeBtn(\`✕ Rejected\`, bColors.rejected);
    } else if (isDeleted) {
      singleBadge = makeBadge(\`Position Cancelled\`, bColors.cancelled);
      primaryButton = makeBtn(\`Position Cancelled\`, bColors.cancelled);
    } else if (appStatusLower === 'interview') {
      singleBadge = makeBadge(\`My Status: Interview\`, bColors.interview);
      primaryButton = makeBtn(\`In Interview\`, bColors.interview);
    } else if (appStatusLower === 'shortlisted') {
      singleBadge = makeBadge(\`My Status: Shortlisted\`, bColors.shortlisted);
      primaryButton = makeBtn(\`Shortlisted\`, bColors.shortlisted);
    } else {
      singleBadge = makeBadge(\`My Status: \${displayStatus}\`, bColors.applied);
      if (isClosed) {
        primaryButton = makeBtn(\`Position Closed\`, bColors.closed);
      } else {
        primaryButton = makeBtn(\`✓ Applied\`, bColors.applied);
      }
    }
  } else {
    // Not applied
    if (isDeleted) {
      singleBadge = makeBadge(\`Position Cancelled\`, bColors.cancelled);
      primaryButton = makeBtn(\`Position Cancelled\`, bColors.cancelled);
    } else if (isClosed) {
      singleBadge = makeBadge(\`Closed\`, bColors.closed);
      primaryButton = makeBtn(\`Position Closed\`, bColors.closed);
    } else if (isSuspended) {
      singleBadge = makeBadge(\`Suspended\`, "bg-red-100 text-red-700");
      primaryButton = makeBtn(\`Position Suspended\`, "bg-red-100 text-red-700");
    } else if (isExpired) {
      singleBadge = makeBadge(\`Expired\`, "bg-red-100 text-red-700");
      primaryButton = makeBtn(\`This position has expired\`, "bg-red-100 text-red-700");
    } else if (isActive) {
      if (daysLeft !== null && daysLeft > 0) {
        if (daysLeft === 1) singleBadge = makeBadge(\`1 day left\`, "bg-yellow-100 text-yellow-800");
        else singleBadge = makeBadge(\`\${daysLeft} days left\`, "bg-blue-100 text-blue-800");
      } else if (daysLeft === 0) {
        singleBadge = makeBadge(\`Expires today\`, "bg-yellow-100 text-yellow-800");
      }
      
      primaryButton = (
        <Button onClick={openApplicationModal} disabled={isApplying || loadingProfile} className="w-full justify-center">
          {isApplying || loadingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply Now'}
        </Button>
      );
    }
  }

  const formatSalary = (min, max) => {
    if (min == null && max == null) return 'Not specified';
    if (min === max) return \`$\${min.toLocaleString()}\`;
    return \`$\${min.toLocaleString()} - $\${max.toLocaleString()}\`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to={location.pathname.startsWith('/seeker') ? '/seeker/jobs' : '/jobs'} className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
        &larr; Back to jobs
      </Link>

      {notification && (
        <div className={\`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium \${
          notification.type === 'error'
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }\`}>
          <span>{notification.text}</span>
          <button 
            onClick={() => setNotification(null)}
            className={\`p-1 rounded-md transition-colors \${
              notification.type === 'error'
                ? 'hover:bg-red-100 text-red-600'
                : 'hover:bg-green-100 text-green-600'
            }\`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                {singleBadge}
              </div>
              
              <div className="flex items-center gap-2 text-lg text-gray-700">
                <button onClick={() => setShowCompanyModal(true)} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  <Building className="h-5 w-5" /> {job.company}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.employment_type}</div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> 
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Posted {new Date(job.created_at).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[140px]">
              {primaryButton}
              {isSeeker && (`;

content = content.replace(logicRegex, newLogic);

fs.writeFileSync(jobDetailsPath, content);
console.log('Successfully applied exact state matrix to JobDetails.jsx');
