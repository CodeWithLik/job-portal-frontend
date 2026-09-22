const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('const [currentPage, setCurrentPage]')) {
  // Add state
  content = content.replace(
    'const [loading, setLoading] = useState(true);',
    `const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(savedJobs.length / itemsPerPage));
  const paginatedJobs = savedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };`
  );

  // Replace savedJobs.map with paginatedJobs.map
  content = content.replace(
    'savedJobs.map(job => {',
    'paginatedJobs.map(job => {'
  );

  // Add the footer after the map closes
  const mapClose = `          })}
        </div>`;
  const footer = `          })}
        </div>

        {/* Pagination Footer */}
        {savedJobs.length > itemsPerPage && (
          <div className="mt-6 p-4 border border-gray-200 flex flex-wrap gap-4 items-center justify-between bg-white rounded-lg">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, savedJobs.length)} to {Math.min(currentPage * itemsPerPage, savedJobs.length)} of {savedJobs.length} jobs
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button 
                variant="ghost" 
                disabled={currentPage === 1}
                onClick={(e) => handlePageChange(e, Math.max(1, currentPage - 1))}
                className="px-3"
              >
                Previous
              </Button>
              <div className="flex flex-wrap items-center gap-1">
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
              </div>
              <Button 
                variant="ghost" 
                disabled={currentPage === totalPages}
                onClick={(e) => handlePageChange(e, Math.min(totalPages, currentPage + 1))}
                className="px-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}`;

  content = content.replace(mapClose, footer);
  
  fs.writeFileSync(path, content);
  console.log('Added pagination to SavedJobs.jsx');
} else {
  console.log('SavedJobs.jsx already has pagination');
}
