const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

content = content.replace(
  /<Badge variant="gray">Closed<\/Badge>/g,
  '<Badge variant="sand">Closed</Badge>'
);

fs.writeFileSync(jobDetailsPath, content);
console.log('Updated Closed badge to sand in JobDetails');
