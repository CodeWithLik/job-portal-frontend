const fs = require('fs');
const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let registerContent = fs.readFileSync(registerPath, 'utf8');

// Change scroll-margin-top from 1.5rem (6) to roughly 7.5rem (32) to account for the sticky navbar height
registerContent = registerContent.replace(
  '<div ref={formTopRef} className="scroll-mt-6" />',
  '<div ref={formTopRef} className="scroll-mt-32" aria-hidden="true" />'
);

fs.writeFileSync(registerPath, registerContent);
console.log('Fixed scroll padding for navbar offset');
