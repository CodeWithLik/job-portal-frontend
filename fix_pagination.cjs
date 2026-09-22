const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx';
let content = fs.readFileSync(path, 'utf8');

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

content = content.replace(
  'const paginatedActivities = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);',
  'const paginatedActivities = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);' + helperFunction
);

const oldMap = `Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={(e) => handlePageChange(e, page)}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))`;

const newMap = `getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={(e) => page !== '...' && handlePageChange(e, page)}
                      disabled={page === '...'}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))`;

content = content.replace(oldMap, newMap);

// The user screenshot shows "Previous" and "Next" buttons overflowing on small screens.
// We should also add flex-wrap to the pagination container if it isn't already there.
// Currently: <div id="pagination-footer" className="border-t border-gray-200 p-4 flex items-center justify-between bg-white rounded-b-lg">
content = content.replace(
  'className="border-t border-gray-200 p-4 flex items-center justify-between bg-white rounded-b-lg"',
  'className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between bg-white rounded-b-lg"'
);

// We should also ensure the gap-2 items-center container can wrap if needed, though truncating pages should fix it.
content = content.replace(
  '<div className="flex gap-2 items-center">',
  '<div className="flex flex-wrap gap-2 items-center">'
);

fs.writeFileSync(path, content);
console.log('Fixed pagination in Activity.jsx');
