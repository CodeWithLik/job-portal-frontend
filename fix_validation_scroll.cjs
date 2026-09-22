const fs = require('fs');

const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(registerPath, 'utf8');

// Remove the scrollIntoView block for frontend validation errors
const oldValidationScroll = `      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        if (formTopRef.current) {
          formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }`;

const newValidationScroll = `      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }`;

content = content.replace(oldValidationScroll, newValidationScroll);

fs.writeFileSync(registerPath, content);
console.log('Removed annoying frontend validation auto-scroll');
