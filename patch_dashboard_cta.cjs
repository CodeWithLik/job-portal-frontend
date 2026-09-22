const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `              {!loading && jobs.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No jobs found. Post a job to get started!
                  </td>
                </tr>
              )}`;

const replaceStr = `              {!loading && jobs.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                    <p className="mb-4">No jobs found. Post a job to get started!</p>
                    <Link 
                      to="/recruiter/post-job"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Post Your First Job
                    </Link>
                  </td>
                </tr>
              )}`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully patched Dashboard empty state');
} else {
  console.log('Could not find search string in Dashboard.jsx');
}
