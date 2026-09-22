const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

content = content.replace(
  /\{isSeeker && \(/,
  '{isSeeker && (isActive || hasSaved) && ('
);

fs.writeFileSync(jobDetailsPath, content);
console.log('Updated JobDetails.jsx Save Job logic');
