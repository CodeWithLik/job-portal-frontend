const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', 'utf8');

const regex = /const passErrors = \[\];[\s\S]*?errors\.password = 'Password must include: ' \+ passErrors\.join\('\!, '\) \+ '\.';[\s\S]*?\}/;
// Wait, regex doesn't have literal string `\!, '` it is just `, `
const strictRegex = /const passErrors = \[\];\s*if[\s\S]*?errors\.password = 'Password must include: ' \+ passErrors\.join\([^)]*\) \+ '\.';\s*\}/;

const newBlock = `const passErrors = [];
        if (pass.length < 8) passErrors.push('at least 8 characters');
        if (!/[A-Z]/.test(pass)) passErrors.push('an uppercase letter');
        if (!/[a-z]/.test(pass)) passErrors.push('a lowercase letter');
        if (!/[0-9]/.test(pass)) passErrors.push('a number');
        if (!/[-@$!%*?&#^()_+=]/.test(pass)) passErrors.push('a special character');
        
        if (passErrors.length > 0) {
          let formattedErrors = '';
          if (passErrors.length === 1) {
            formattedErrors = passErrors[0];
          } else if (passErrors.length === 2) {
            formattedErrors = passErrors.join(' and ');
          } else {
            const last = passErrors.pop();
            formattedErrors = passErrors.join(', ') + ', and ' + last;
          }
          errors.password = 'Password must contain ' + formattedErrors + '.';
        }`;

content = content.replace(strictRegex, newBlock);
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', content);
console.log('Password formatting updated');
