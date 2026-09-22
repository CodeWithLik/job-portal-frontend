const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /export const AdminJobs = \(\) => \{/;
const replacement = `export const AdminJobs = () => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return \`\${baseUrl}\${url}\`;
  };`;

if (!content.includes('const getImageUrl =')) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
  console.log('Inserted getImageUrl into Jobs.jsx');
} else {
  console.log('getImageUrl already exists');
}
