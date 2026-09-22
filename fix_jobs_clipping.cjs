const fs = require('fs');

const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(jobsPath, 'utf8');

// Increase bottom padding to prevent clipping in scrollable containers on certain browsers
content = content.replace(
  '<div className="space-y-6 pb-2">',
  '<div className="space-y-6 pb-8">'
);

// Add an explicit spacer div at the very end of the modal just to be completely safe against flex bugs
content = content.replace(
  /<div>\s*<Button variant="secondary" onClick=\{\(\) => setDetailsModalOpen\(false\)\}>Close<\/Button>\s*<\/div>\s*<\/div>/,
  `<div>
                  <Button variant="secondary" onClick={() => setDetailsModalOpen(false)}>Close</Button>
                </div>
              </div>
              <div className="h-4 w-full shrink-0"></div>`
);

fs.writeFileSync(jobsPath, content);
console.log('Fixed Jobs.jsx clipping by adding solid spacers and padding');
