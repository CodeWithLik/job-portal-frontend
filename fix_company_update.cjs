const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const regex = /const savedData = \{ \.\.\.profile, logo: newLogoUrl \};\s*setProfile\(savedData\);\s*setOriginalProfile\(savedData\);\s*setLogoFile\(null\);\s*setLogoPreview\(null\);\s*showNotification\('Company profile updated successfully!'\);/m;

const replacement = `const savedData = { ...profile, logo: newLogoUrl };
      setProfile(savedData);
      setOriginalProfile(savedData);
      setLogoFile(null);
      setLogoPreview(null);

      if (updateUser) {
        updateUser({ avatar: newLogoUrl });
      }

      showNotification('Company profile updated successfully!');`;

content = content.replace(regex, replacement);

fs.writeFileSync(profilePath, content);
console.log('Fixed CompanyProfile.jsx updateUser call');
