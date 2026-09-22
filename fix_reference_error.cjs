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

for (const filePath of filesToPatch) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert getPageNumbers if not present
  if (!content.includes('const getPageNumbers = () => {')) {
    // Inject it right after paginatedUsers / paginatedJobs / paginatedApplications
    const regex = /(const paginated\w+ = [^;]+;)/;
    if (regex.test(content)) {
      content = content.replace(regex, `$1\n${helperFunction}`);
      fs.writeFileSync(filePath, content);
      console.log('Successfully injected getPageNumbers into', path.basename(filePath));
    } else {
      console.log('Failed to find insertion point in', path.basename(filePath));
    }
  } else {
    console.log(path.basename(filePath), 'already has getPageNumbers');
  }
}
