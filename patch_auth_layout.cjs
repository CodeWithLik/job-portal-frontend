const fs = require('fs');
const path = require('path');

function reorganizeAuthFile(filePath, isRegister) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the "or" divider and Google Button
  const dividerRegex = /<div className="relative mt-[0-9]+ mb-[0-9]+">[\s\S]*?<div className="relative flex justify-center text-sm">[\s\S]*?<span className="px-2 bg-white text-gray-500">or<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/;
  const dividerMatch = content.match(dividerRegex);
  
  const googleBtnRegex = /<Button[\s\S]*?onClick=\{handleGoogleAuth\}[\s\S]*?>[\s\S]*?<svg[\s\S]*?<\/svg>\s*Continue with Google\s*<\/Button>/;
  const googleBtnMatch = content.match(googleBtnRegex);

  if (!dividerMatch || !googleBtnMatch) {
    console.log(`Could not find divider or Google button in ${filePath}`);
    return;
  }

  // Remove them from their current position
  content = content.replace(dividerMatch[0], '');
  content = content.replace(googleBtnMatch[0], '');

  // Define the new block with proper spacing
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
  if (isRegister) {
    // Insert after the Account Type toggle
    const insertionPoint = `</button>\n              </div>\n            </div>`;
    content = content.replace(insertionPoint, insertionPoint + blockToInsert);
  } else {
    // Insert after the <form> start tag
    const insertionPoint = `<form className="flex flex-col" onSubmit={handleLogin} noValidate>`;
    content = content.replace(insertionPoint, insertionPoint + blockToInsert);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Successfully reorganized ${filePath}`);
}

reorganizeAuthFile(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx'), true);
reorganizeAuthFile(path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx'), false);
