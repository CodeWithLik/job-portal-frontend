const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const target = `setLogoPreview(null);
        
        setIsEditing(false);
        setNotification('Company profile updated successfully!');`;

const regex = /setLogoPreview\(null\);\s*setIsEditing\(false\);\s*setNotification\('Company profile updated successfully!'\);/m;

const replacement = `setLogoPreview(null);
        
        if (updateUser) {
          updateUser({
            avatar: newLogoUrl,
            company_name: savedProfile.name || savedProfile.companyName || savedProfile.company_name
          });
        }
        
        setIsEditing(false);
        setNotification('Company profile updated successfully!');`;

content = content.replace(regex, replacement);

fs.writeFileSync(profilePath, content);
console.log('Fixed CompanyProfile.jsx properly this time!');
