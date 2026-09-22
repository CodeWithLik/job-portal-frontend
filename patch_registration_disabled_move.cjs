const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// The banner might be stuck at the bottom of the file or lost, or still in its original place?
// Let's find it.
const bannerStartIdx = content.indexOf('{isRegistrationDisabled && (');
if (bannerStartIdx !== -1) {
  // It's still in the file.
  // Wait, the previous script DID NOT remove it because bannerEndIdx matched, but insertPos didn't...
  // Actually, if `insertPos` failed, `content.substring(-1)` would have done weird things.
  // Let me just grab the current file, strip out all instances of the banner, and re-insert it properly.
  
  // First, strip it cleanly
  const bannerRegex = /\{isRegistrationDisabled && \(\s*<div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">\s*<div className="flex gap-2">\s*<AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" \/>\s*<div>\s*<p className="font-medium">\{disabledMessage\}<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}/g;
  
  content = content.replace(bannerRegex, '');
  
  // Re-insert exactly below the Header div
  const targetHeaderStr = '            </p>\n          </div>';
  const insertPos = content.indexOf(targetHeaderStr) + targetHeaderStr.length;
  
  const bannerJSX = `
          {isRegistrationDisabled && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{disabledMessage}</p>
                </div>
              </div>
            </div>
          )}`;
          
  content = content.substring(0, insertPos) + '\n' + bannerJSX + content.substring(insertPos);
}

fs.writeFileSync(registerPath, content);
console.log('Register.jsx fixed position.');
