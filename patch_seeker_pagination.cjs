const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\FindJobs.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Applications.jsx'
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

  // Find totalPages definition and inject if needed
  if (!content.includes('const getPageNumbers = () => {')) {
    // Regex matches `const totalPages = Math.ceil(...)` or `const totalPages = Math.max(...)`
    const totalPagesRegex = /(const totalPages = Math\.(?:ceil|max)\([^;]+;\s*)/;
    if (totalPagesRegex.test(content)) {
      content = content.replace(totalPagesRegex, `$1\n${helperFunction}`);
      console.log('Successfully injected getPageNumbers into', path.basename(filePath));
    } else {
      console.log('Failed to find insertion point in', path.basename(filePath));
    }
  }

  // Replace Array.from(...).map(...) with newMap
  const oldMapRegex = /\{Array\.from\(\{ length: totalPages \}, \(\_, i\) => i \+ 1\)\.map\(page => \([\s\S]*?<\/button>\s*\)\)\}/m;
  if (oldMapRegex.test(content)) {
    content = content.replace(oldMapRegex, newMap);
  }

  // Add flex-wrap to footer items
  content = content.replace(
    'className="border-t border-gray-200 p-4 flex items-center justify-between bg-white rounded-b-lg"',
    'className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between bg-white rounded-b-lg"'
  );
  
  // also specifically in seeker FindJobs and Applications the footer might be styled slightly differently:
  // e.g. <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
  content = content.replace(
    /className="([^"]*?)flex items-center justify-between([^"]*?bg-gray-50\/50[^"]*?)"/,
    'className="$1flex flex-wrap gap-4 items-center justify-between$2"'
  );

  content = content.replace(
    '<div className="flex gap-2 items-center">',
    '<div className="flex flex-wrap gap-2 items-center">'
  );
  content = content.replace(
    '<div className="flex items-center gap-1">',
    '<div className="flex flex-wrap items-center gap-1">'
  );

  fs.writeFileSync(filePath, content);
  console.log('Patched', path.basename(filePath));
}
