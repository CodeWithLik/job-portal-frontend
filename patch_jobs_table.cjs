const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldTableStart = `<table className="w-full text-left border-collapse">`;
const newTableStart = `<table className="w-full text-left border-collapse whitespace-nowrap min-w-max">`;

if (content.includes(oldTableStart)) {
  content = content.replace(oldTableStart, newTableStart);
  fs.writeFileSync(path, content);
  console.log('Successfully updated Jobs table with whitespace-nowrap and min-w-max!');
} else {
  console.log('Could not find the target string in Jobs.jsx');
}
