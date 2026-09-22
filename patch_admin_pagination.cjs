const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx'
];

const helperFunction = `
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) { endPage = 4; }
    if (currentPage >= totalPages - 2) { startPage = totalPages - 3; }
    if (startPage > 2) { pages.push('...'); }
    for (let i = startPage; i <= endPage; i++) { pages.push(i); }
    if (endPage < totalPages - 1) { pages.push('...'); }
    pages.push(totalPages);
    return pages;
  };
`;

const newMap = `{getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={(e) => page !== '...' && handlePageChange(e, page)}
                      disabled={page === '...'}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))}`;

for (const filePath of filesToPatch) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert getPageNumbers
  if (!content.includes('const getPageNumbers = () => {')) {
    // We can inject it right after paginatedUsers or paginatedJobs or paginatedActivities
    // Instead of looking for paginatedX, we'll look for `const totalPages = Math.ceil(...);`
    content = content.replace(
      /(const totalPages = Math\.ceil\([^)]+\);(?:\r?\n\s*const paginated\w+ = [^;]+;)?)/,
      `$1\n${helperFunction}`
    );
  }

  // Replace the array map
  const oldMapRegex = /\{Array\.from\(\{ length: totalPages \}, \(\_, i\) => i \+ 1\)\.map\(page => \([\s\S]*?<\/button>\s*\)\)\}/m;
  if (oldMapRegex.test(content)) {
    content = content.replace(oldMapRegex, newMap);
  }

  // Add flex-wrap to footer
  content = content.replace(
    'className="border-t border-gray-200 p-4 flex items-center justify-between bg-white rounded-b-lg"',
    'className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between bg-white rounded-b-lg"'
  );
  
  // Also fix the inner flex container
  content = content.replace(
    '<div className="flex gap-2 items-center">',
    '<div className="flex flex-wrap gap-2 items-center">'
  );

  fs.writeFileSync(filePath, content);
  console.log('Patched', path.basename(filePath));
}
