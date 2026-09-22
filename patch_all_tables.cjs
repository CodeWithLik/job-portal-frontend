const fs = require('fs');

const files = [
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Applications.jsx',
  'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx'
];

const oldTableStart = `<table className="w-full text-left border-collapse">`;
const newTableStart = `<table className="w-full text-left border-collapse whitespace-nowrap min-w-max">`;

files.forEach(path => {
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    if (content.includes(oldTableStart)) {
      content = content.replace(oldTableStart, newTableStart);
      fs.writeFileSync(path, content);
      console.log(`Successfully updated table in ${path}`);
    } else {
      console.log(`Could not find the target string in ${path}`);
    }
  } else {
    console.log(`File not found: ${path}`);
  }
});
