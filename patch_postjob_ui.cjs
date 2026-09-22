const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\PostJob.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `<div className="bg-yellow-50 text-yellow-800 p-8 rounded-md border border-yellow-200 flex flex-col items-center justify-center text-center gap-4">
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
        </div>`;

const replaceStr = `<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-10">
          <div className="bg-blue-50 p-4 rounded-full mb-6">
            <Briefcase className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Company Profile</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            To build trust with candidates, please add your company's Industry, Location, and Description before publishing job posts.
          </p>
          <button 
            onClick={() => navigate('/recruiter/company')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go to Company Profile
          </button>
        </div>`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated the empty state UI in PostJob.jsx');
} else {
  console.log('Could not find search string in PostJob.jsx');
}
