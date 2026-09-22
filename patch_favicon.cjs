const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\index.html';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `<title>AI-Integrated Job Portal</title>`;
const replaceStr = `<title>AI-Integrated Job Portal</title>
    <link rel="icon" type="image/png" href="/logo.png" />`;

if (content.includes(searchStr) && !content.includes('<link rel="icon"')) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully added favicon to index.html');
} else {
  console.log('Could not find search string or favicon already exists');
}
