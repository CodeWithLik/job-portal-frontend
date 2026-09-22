const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /{Array\.from\(\{ length: totalPages \}, \(_, i\) => i \+ 1\)\.map\(page => \([\s\S]*?<\/button>\s*\)\)}/;

const newPagination = `{getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={(e) => page !== '...' && handlePageChange(e, page)}
                      disabled={page === '...'}
                      className={\`px-3 py-1 rounded-md text-sm font-medium transition-colors \${page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}\`}
                    >
                      {page}
                    </button>
                  ))}`;

if (regex.test(content)) {
  content = content.replace(regex, newPagination);
  
  const oldFooter = /className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center \njustify-between bg-white rounded-b-lg"/;
  content = content.replace(oldFooter, 'className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg"');

  // fallback replacement if the newline wasn't exactly there
  content = content.replace('className="border-t border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between bg-white rounded-b-lg"', 'className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg"');
  
  fs.writeFileSync(path, content);
  console.log("Activity pagination successfully updated via regex!");
} else {
  console.log("Could not find the target code to replace.");
}
