const fs = require('fs');

const fixLayout = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the exact wrapper div line
  const oldWrapperRegex = /<div className="min-h-\[calc\(100vh-10rem\)\] flex items-start justify-center bg-gray-50 pt-\d+ pb-\d+ px-4 sm:px-6 lg:px-8">/;
  const alternativeRegex = /<div className="min-h-\[calc\(100vh-10rem\)\] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">/;

  // We want to replace it with a flex-grow wrapper
  const newWrapper = '<div className="flex-grow w-full flex bg-gray-50 p-4 sm:p-6 lg:p-8">';

  if (oldWrapperRegex.test(content)) {
    content = content.replace(oldWrapperRegex, newWrapper);
  } else if (alternativeRegex.test(content)) {
    content = content.replace(alternativeRegex, newWrapper);
  } else {
    // Brute force replace if regex fails
    content = content.replace(/<div className="min-h-\[calc[^>]+>/, newWrapper);
  }

  // Find the Card and add m-auto
  content = content.replace(
    /<Card className="max-w-md w-full">/,
    '<Card className="max-w-md w-full m-auto">'
  );

  fs.writeFileSync(filePath, content);
};

fixLayout('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx');
fixLayout('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx');

console.log('Fixed bulletproof layout for Login and Register');
