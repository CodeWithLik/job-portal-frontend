const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\index.html';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `<title>AI-Integrated Job Portal</title>`;
const replaceStr = `<title>AI Job Portal</title>`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated title in index.html');
} else {
  console.log('Could not find search string in index.html');
}
