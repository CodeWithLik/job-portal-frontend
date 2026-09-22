const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const regex = /if \(updateUser\) \{\s*updateUser\(\{ avatar: newLogoUrl \}\);\s*\}/m;
const replacement = `if (updateUser) {
        updateUser({ 
          avatar: newLogoUrl,
          company_name: savedData.name || savedData.companyName || savedData.company_name
        });
      }`;

content = content.replace(regex, replacement);

fs.writeFileSync(profilePath, content);
console.log('Fixed CompanyProfile.jsx to sync company_name');
