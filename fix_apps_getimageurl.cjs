const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('const getImageUrl =')) {
  content = content.replace(
    'export const AdminApplications = () => {',
    `export const AdminApplications = () => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return \`\${baseUrl}\${url}\`;
  };`
  );
  fs.writeFileSync(path, content);
  console.log('Injected getImageUrl securely');
} else {
  console.log('already has getImageUrl');
}
