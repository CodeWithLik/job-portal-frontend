const fs = require('fs');
const path = require('path');

function compressLayout(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Outer padding (py-12 -> py-4)
  content = content.replace(/py-12/g, 'py-4');
  
  // Card padding (p-8 -> p-6)
  content = content.replace(/p-8/g, 'p-5 sm:p-6');
  
  // Header margin bottom (mb-8 -> mb-5)
  content = content.replace(/mb-8/g, 'mb-5');
  
  // Title size (text-3xl -> text-2xl)
  content = content.replace(/text-3xl/g, 'text-2xl');
  
  // Subtitle margin (mb-6 -> mb-3)
  content = content.replace(/mb-6/g, 'mb-3');
  
  // Divider margins (mt-5 mb-5 -> mt-3 mb-3)
  content = content.replace(/mt-5 mb-5/g, 'mt-3 mb-3');
  
  // Login outer padding (pt-12 pb-32 -> py-6)
  content = content.replace(/pt-12 pb-32/g, 'py-6');
  
  fs.writeFileSync(filePath, content);
  console.log(`Compressed ${filePath}`);
}

compressLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'));
compressLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'));
