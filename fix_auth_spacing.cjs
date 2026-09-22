const fs = require('fs');

const fixSpacing = () => {
  // --- Fix Register.jsx ---
  const regPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
  let regContent = fs.readFileSync(regPath, 'utf8');

  // Increase wrapper bottom padding for generous clearance
  regContent = regContent.replace(
    /className="flex-grow w-full bg-gray-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8"/,
    'className="flex-grow w-full bg-gray-50 pt-12 pb-32 px-4 sm:px-6 lg:px-8"'
  );
  
  // Compact form by removing space-y-3 which doubles up with Input's mb-4
  regContent = regContent.replace(
    /<form className="space-y-3"/,
    '<form className="flex flex-col"'
  );

  // Compact terms checkbox margins
  regContent = regContent.replace(
    /<div className="space-y-1 mb-2 mt-4">/,
    '<div className="space-y-1 mb-4 mt-2">'
  );

  // Account Type container spacing
  regContent = regContent.replace(
    /<div className="mb-2">/,
    '<div className="mb-4">'
  );

  fs.writeFileSync(regPath, regContent);

  // --- Fix Login.jsx ---
  const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
  let loginContent = fs.readFileSync(loginPath, 'utf8');

  // Increase wrapper bottom padding for generous clearance
  loginContent = loginContent.replace(
    /className="flex-grow w-full bg-gray-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8"/,
    'className="flex-grow w-full bg-gray-50 pt-12 pb-32 px-4 sm:px-6 lg:px-8"'
  );

  // Compact form spacing
  loginContent = loginContent.replace(
    /<form className="space-y-5"/,
    '<form className="flex flex-col"'
  );
  loginContent = loginContent.replace(
    /<div className="space-y-4">/,
    '<div className="flex flex-col">'
  );

  fs.writeFileSync(loginPath, loginContent);
  console.log('Fixed vertical padding and compacted forms');
};

fixSpacing();
