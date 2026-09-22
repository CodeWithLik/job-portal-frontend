const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldPagination = `<div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={(e) => handlePageChange(e, page)}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))}
                </div>`;

const newPagination = `<div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={(e) => page !== '...' && handlePageChange(e, page)}
                      disabled={page === '...'}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))}
                </div>`;

if (content.includes(oldPagination)) {
  content = content.replace(oldPagination, newPagination);
  
  // also make the footer flex un-wrapped or just better layout
  const oldFooter = `<div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between bg-white rounded-b-lg">`;
  const newFooter = `<div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">`;
  content = content.replace(oldFooter, newFooter);
  
  fs.writeFileSync(path, content);
  console.log("Activity pagination successfully updated!");
} else {
  console.log("Could not find the target code to replace.");
}
