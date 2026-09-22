const fs = require('fs');
const path = require('path');

const loginPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx');

if (fs.existsSync(loginPath)) {
  let content = fs.readFileSync(loginPath, 'utf8');

  // Extract the "or" divider and Google Button
  const dividerRegex = /<div className="relative">[\s\S]*?<div className="absolute inset-0 flex items-center">[\s\S]*?<div className="w-full border-t border-gray-300" \/>[\s\S]*?<\/div>[\s\S]*?<div className="relative flex justify-center text-sm">[\s\S]*?<span className="px-2 bg-white text-gray-500">or<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/;
  const dividerMatch = content.match(dividerRegex);
  
  const googleBtnRegex = /<Button[\s\S]*?onClick=\{handleGoogleAuth\}[\s\S]*?>[\s\S]*?<svg[\s\S]*?<\/svg>\s*Continue with Google\s*<\/Button>/;
  const googleBtnMatch = content.match(googleBtnRegex);

  if (dividerMatch && googleBtnMatch) {
    // Remove them from their current position
    content = content.replace(dividerMatch[0], '');
    content = content.replace(googleBtnMatch[0], '');

    // Define the new block
    const newDivider = `<div className="relative mt-5 mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with email</span>
                </div>
              </div>`;

    const newGoogleBtn = googleBtnMatch[0].replace('className="', 'className="mb-1 ');
    
    const blockToInsert = `
              ${newGoogleBtn}
              ${newDivider}
  `;

    // Insert location
    const insertionPoint = `<form className="flex flex-col" onSubmit={handleLogin} noValidate>`;
    content = content.replace(insertionPoint, insertionPoint + blockToInsert);

    fs.writeFileSync(loginPath, content);
    console.log(`Successfully reorganized Login.jsx`);
  } else {
    console.log('Regex did not match in Login.jsx');
  }
}
