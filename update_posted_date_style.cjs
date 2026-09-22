const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `<p className="text-xs text-gray-500 mt-1">Posted Date: {jobToView.created_at ? new Date(jobToView.created_at).toLocaleDateString() : 'N/A'}</p>`;
const replacementStr = `<p className="text-xs text-gray-500 mt-3">Posted Date: <span className="font-bold text-gray-700">{jobToView.created_at ? new Date(jobToView.created_at).toLocaleDateString() : 'N/A'}</span></p>`;

content = content.replace(targetStr, replacementStr);

fs.writeFileSync(path, content);
console.log('Updated Posted Date styling in Jobs modal');
