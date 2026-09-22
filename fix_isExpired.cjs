const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /let isExpired = job.status === 'Expired' \|\| isDeleted;/g,
  'isExpired = job.status === \'Expired\' || isDeleted;'
);

fs.writeFileSync(path, content);
console.log('Fixed variable shadowing');
