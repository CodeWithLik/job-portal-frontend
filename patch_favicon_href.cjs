const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\index.html';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `<link rel="icon" type="image/png" href="/logo.png" />`;
const replaceStr = `<link rel="icon" type="image/png" href="/favicon.png" />`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Successfully updated index.html to use transparent favicon');
} else {
  console.log('Could not find search string in index.html');
}
