const fs = require('fs');
const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let registerContent = fs.readFileSync(registerPath, 'utf8');

// Update main wrapper
registerContent = registerContent.replace(
  '<div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">',
  '<div className="min-h-[calc(100vh-10rem)] flex items-start justify-center bg-gray-50 pt-12 pb-24 px-4 sm:px-6 lg:px-8">'
);

// We changed items-center to items-start with pt-12 so it doesn't get vertically centered off-screen on short screens, and added pb-24 so it never hugs the bottom.

// Update CardBody
registerContent = registerContent.replace(
  '<CardBody className="p-6">',
  '<CardBody className="p-6 sm:p-8 sm:pb-10">'
);

fs.writeFileSync(registerPath, registerContent);
console.log('Fixed Register vertical layout spacing');
