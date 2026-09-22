const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// 1. Re-order button logic
const oldButtonLogic = `{job.status === 'Closed' || job.status === 'Suspended' ? (
                  <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                    This position is closed
                  </Button>
                ) : job.is_deleted ? (
                  <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                    Position Cancelled
                  </Button>
                ) : isExpired ? (`;

const newButtonLogic = `{job.is_deleted || job.status === 'Deleted' || job.status === 'deleted' ? (
                  <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                    Position Cancelled
                  </Button>
                ) : job.status === 'Closed' || job.status === 'Suspended' ? (
                  <Button disabled className="w-full justify-center bg-gray-100 text-gray-700 border-gray-200 opacity-100 cursor-not-allowed">
                    This position is closed
                  </Button>
                ) : isExpired ? (`;

content = content.replace(oldButtonLogic, newButtonLogic);

// 2. Add applicationBadge logic before expirationBadge
const expirationBadgeLogicRegex = /(let expirationBadge = null;\s*if\s*\(job\.is_deleted\)\s*\{)/;

const applicationBadgeLogic = `let applicationBadge = null;
  if (isSeeker && hasApplied) {
    let color = 'gray';
    const statusLower = (applicationStatus || '').toLowerCase();
    if (statusLower === 'hired') color = 'success';
    else if (statusLower === 'interview') color = 'primary';
    else if (statusLower === 'rejected') color = 'error';
    
    applicationBadge = (
      <Badge variant={color} className="ml-2">
        My Status: {applicationStatus || 'Applied'}
      </Badge>
    );
  }

  $1`;

content = content.replace(expirationBadgeLogicRegex, applicationBadgeLogic);

// 3. Inject applicationBadge next to expirationBadge in the title
const titleRegex = /(<h1 className="text-3xl font-bold text-gray-900">\{job\.title\}<\/h1>\s*\{expirationBadge\})/g;

content = content.replace(titleRegex, '$1\n                  {applicationBadge}');

fs.writeFileSync(jobDetailsPath, content);
console.log('Fixed JobDetails button order and added application badge');
