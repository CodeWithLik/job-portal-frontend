const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter';

function patchHeaders(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const fullPath = path.join(dirPath, file);
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const oldHeader = `className="flex justify-between items-center"`;
      const newHeader = `className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"`;
      
      const oldHeaderBorder = `className="flex justify-between items-center border-b border-gray-200 pb-4"`;
      const newHeaderBorder = `className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4"`;
      
      let changed = false;
      if (content.includes(oldHeader)) {
        content = content.replace(new RegExp(oldHeader.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newHeader);
        changed = true;
      }
      if (content.includes(oldHeaderBorder)) {
        content = content.replace(new RegExp(oldHeaderBorder.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newHeaderBorder);
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Patched header in ${file}`);
      }
    }
  });
}

patchHeaders(dir);
