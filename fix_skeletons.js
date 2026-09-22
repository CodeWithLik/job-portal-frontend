const fs = require('fs');
const glob = require('fs').readdirSync; // Not quite glob, but we can do it manually or just define the paths

const files = {
  table: [
    'src/pages/admin/Jobs.jsx',
    'src/pages/admin/Users.jsx',
    'src/pages/recruiter/ManageJobs.jsx'
  ],
  div: [
    'src/pages/admin/Activity.jsx',
    'src/pages/admin/Applications.jsx',
    'src/pages/seeker/Applications.jsx',
    'src/pages/seeker/SavedJobs.jsx',
    'src/pages/recruiter/Applicants.jsx'
  ],
  profile: [
    'src/pages/seeker/Profile.jsx'
  ]
};

const tableSkeleton = \                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-100 last:border-0">
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
                    </tr>
                  ))\;

const divSkeleton = \          <div className="grid grid-cols-1 gap-4 w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse w-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-1/2">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>\;

const profileSkeleton = \                <div className="py-2 w-full max-w-sm mx-auto animate-pulse">
                  <div className="h-14 bg-gray-200 rounded-lg w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>\;

// 1. Process Table files
files.table.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Regular expression to find the loading ? <tr>...</tr>
  const pattern = /\{\s*loading\s*\?\s*\(\s*<tr>[\s\S]*?<Loader2.*?animate-spin[\s\S]*?<\/tr>\s*\)/;
  if (pattern.test(content)) {
    content = content.replace(pattern, \{loading ? (\\n\\\n)\);
    fs.writeFileSync(file, content);
    console.log('Fixed table skeleton in', file);
  } else {
    console.log('Could not find pattern in', file);
  }
});

// 2. Process Div files
files.div.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const pattern = /\{\s*loading\s*\?\s*\(\s*<div[^>]*><Loader2.*?animate-spin[\s\S]*?<\/div>\s*\)/;
  if (pattern.test(content)) {
    content = content.replace(pattern, \{loading ? (\\n\\\n)\);
    fs.writeFileSync(file, content);
    console.log('Fixed div skeleton in', file);
  } else {
    console.log('Could not find pattern in', file);
  }
});

// 3. Process Profile file
files.profile.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const pattern = /\{\s*loading\s*\?\s*\(\s*<div[^>]*><Loader2.*?animate-spin[\s\S]*?<\/div>\s*\)/;
  if (pattern.test(content)) {
    content = content.replace(pattern, \{loading ? (\\n\\\n)\);
    fs.writeFileSync(file, content);
    console.log('Fixed profile skeleton in', file);
  } else {
    console.log('Could not find pattern in', file);
  }
});

