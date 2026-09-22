const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Settings.jsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">`;

const replaceStr = `  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">`;

if (!content.includes('if (loading) {')) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log('Added loading state return');
} else {
  console.log('Loading state already exists');
}
