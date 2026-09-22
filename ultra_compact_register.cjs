const fs = require('fs');

const regPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(regPath, 'utf8');

// 1. Reduce Wrapper Top Padding (pull it higher up the screen)
content = content.replace(
  /className="flex-grow w-full bg-gray-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8"/,
  'className="flex-grow w-full bg-gray-50 pt-4 pb-16 px-4 sm:px-6 lg:px-8"'
);

// 2. Reduce Card Padding further
content = content.replace(
  /<CardBody className="p-5 sm:p-7">/,
  '<CardBody className="p-4 sm:p-5">'
);

// 3. Reduce Header Margin further
content = content.replace(
  /<p className="text-center text-sm text-gray-600 mb-5">/,
  '<p className="text-center text-sm text-gray-600 mb-3">'
);

// 4. Reduce Account Type Spacing
content = content.replace(
  /<div className="mb-3">\s*<label className="block text-sm font-medium text-gray-700 mb-1">Account Type<\/label>/,
  '<div className="mb-2">\n                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>'
);

// 5. Update Input wrapperClassName to mb-2 (super compact)
content = content.replace(
  /<Input wrapperClassName="mb-3"/g,
  '<Input wrapperClassName="mb-2"'
);

// 6. Tighten Terms Margin
content = content.replace(
  /<div className="space-y-1 mb-3 mt-1">/,
  '<div className="space-y-1 mb-2 mt-1">'
);

// 7. OR divider margin
content = content.replace(
  /<div className="relative mt-2">/,
  '<div className="relative mt-1 mb-1">'
);

fs.writeFileSync(regPath, content);
console.log('Ultra-compacted Register.jsx layout');
