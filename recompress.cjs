const fs = require('fs');
const path = require('path');

function compressLayout(filePath, isLogin) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Outer padding
  if (isLogin) {
    content = content.replace(/pt-12 pb-32/g, 'py-6');
  } else {
    content = content.replace(/py-12/g, 'py-4');
    content = content.replace(/mb-8/g, 'mb-5');
  }
  
  // Shared compressions
  content = content.replace(/className="p-8"/g, 'className="p-5 sm:p-6"');
  content = content.replace(/text-3xl/g, 'text-2xl');
  content = content.replace(/mb-6/g, 'mb-3');
  content = content.replace(/mt-3 mb-6/g, 'mt-3 mb-3');
  
  fs.writeFileSync(filePath, content);
  console.log(`Compressed ${filePath}`);
}

compressLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'), false);
compressLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'), true);
