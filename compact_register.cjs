const fs = require('fs');

const regPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(regPath, 'utf8');

// 1. Reduce Wrapper Padding
content = content.replace(
  /className="flex-grow w-full bg-gray-50 pt-12 pb-32 px-4 sm:px-6 lg:px-8"/,
  'className="flex-grow w-full bg-gray-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8"'
);

// 2. Reduce Card Padding
content = content.replace(
  /<CardBody className="p-6 sm:p-8 sm:pb-10">/,
  '<CardBody className="p-5 sm:p-7">'
);

// 3. Reduce Header Margin
content = content.replace(
  /<h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">/,
  '<h2 className="text-center text-2xl font-extrabold text-gray-900 mb-1">'
);
content = content.replace(
  /<p className="text-center text-sm text-gray-600 mb-8">/,
  '<p className="text-center text-sm text-gray-600 mb-5">'
);

// 4. Reduce Account Type Spacing
content = content.replace(
  /<div className="mb-4">\s*<label className="block text-sm font-medium text-gray-700 mb-1">Account Type<\/label>/,
  '<div className="mb-3">\n                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>'
);
content = content.replace(
  /<button\s+type="button"\s+className={`flex-1 py-1.5/g,
  '<button\n                    type="button"\n                    className={`flex-1 py-1'
);
content = content.replace(
  /<button\s+className={`flex-1 py-1.5/g,
  '<button\n                    className={`flex-1 py-1'
);

// 5. Update Input wrapperClassName
content = content.replace(
  /<Input/g,
  '<Input wrapperClassName="mb-3"'
);

// 6. Tighten Terms Margin (Right below password)
content = content.replace(
  /<div className="space-y-1 mb-4 mt-2">/,
  '<div className="space-y-1 mb-3 mt-1">'
);

// 7. OR divider margin
content = content.replace(
  /<div className="relative mt-3">/,
  '<div className="relative mt-2">'
);

fs.writeFileSync(regPath, content);
console.log('Compacted Register.jsx layout');
