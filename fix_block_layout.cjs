const fs = require('fs');

const fixLayout = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the flex-grow w-full flex bg-gray-50 p-4 wrapper with a block wrapper
  const oldWrapperRegex = /<div className="flex-grow w-full flex bg-gray-50 p-4 sm:p-6 lg:p-8">/;
  const newWrapper = '<div className="flex-grow w-full bg-gray-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8">';

  content = content.replace(oldWrapperRegex, newWrapper);

  // Replace m-auto on Card with mx-auto
  content = content.replace(
    /<Card className="max-w-md w-full m-auto">/,
    '<Card className="max-w-md w-full mx-auto">'
  );

  fs.writeFileSync(filePath, content);
};

fixLayout('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx');
fixLayout('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx');

console.log('Fixed clipping by switching to block layout');
