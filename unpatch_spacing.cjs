const fs = require('fs');
const path = require('path');

function reverseLayout(filePath, isLogin) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Reverse outer padding
  if (isLogin) {
    content = content.replace(/py-6 px-4/g, 'pt-12 pb-32 px-4');
  } else {
    content = content.replace(/py-4 px-4/g, 'py-12 px-4');
  }
  
  // Reverse Card padding
  content = content.replace(/p-5 sm:p-6/g, 'p-8');
  
  // Reverse Header margin bottom
  content = content.replace(/mb-5" ref=\{formTopRef\}/g, 'mb-8" ref={formTopRef}');
  
  // Reverse Title size
  content = content.replace(/text-2xl/g, 'text-3xl');
  
  // Reverse Subtitle margin
  content = content.replace(/mb-3">/g, 'mb-6">');
  
  // Reverse Divider margins
  content = content.replace(/mt-3 mb-3/g, 'mt-5 mb-5');
  
  fs.writeFileSync(filePath, content);
  console.log(`Reversed ${filePath}`);
}

reverseLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'), false);
reverseLayout(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'), true);
