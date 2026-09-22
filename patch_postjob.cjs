const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\PostJob.jsx';
let content = fs.readFileSync(path, 'utf8');

// We need to inject the profile check after `isFetchingProfile` loading block.
// Let's find the end of that block.
const searchStr = `      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">`;

const replaceStr = `      </div>
    );
  }

  const isProfileComplete = companyProfile && companyProfile.industry && companyProfile.location && companyProfile.description;

  if (!isProfileComplete) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          </div>
        </div>
        <div className="bg-yellow-50 text-yellow-800 p-8 rounded-md border border-yellow-200 flex flex-col items-center justify-center text-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 mb-2">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">Company Profile Incomplete</h2>
          <p className="max-w-md">
            You must complete your Company Profile (including Industry, Location, and Description) before you can post jobs. This ensures job seekers have the information they need about your company.
          </p>
          <button 
            onClick={() => navigate('/recruiter/company')}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
          >
            Complete Profile Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully added profile completion block in PostJob.jsx');
} else {
  console.log('Could not find search string in PostJob.jsx');
}
