const fs = require('fs');
const path = require('path');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

// 1. Add useAuth import
content = content.replace(
  "import { api } from '../../context/AuthContext';",
  "import { useAuth, api } from '../../context/AuthContext';"
);

// 2. Destructure updateUser inside component
content = content.replace(
  "export const CompanyProfile = () => {\n  const { onKeyDown } = useEnterNextField();",
  "export const CompanyProfile = () => {\n  const { updateUser } = useAuth();\n  const { onKeyDown } = useEnterNextField();"
);

// 3. Find handleSave success and update
const target = `const savedData = { ...profile, logo: newLogoUrl };
        setProfile(savedData);
        setOriginalProfile(savedData);
        setLogoFile(null);
        setLogoPreview(null);
        
        showNotification('Company profile updated successfully!');`;

const replacement = `const savedData = { ...profile, logo: newLogoUrl };
        setProfile(savedData);
        setOriginalProfile(savedData);
        setLogoFile(null);
        setLogoPreview(null);
        
        if (updateUser) {
          updateUser({ avatar: newLogoUrl });
        }
        
        showNotification('Company profile updated successfully!');`;

content = content.replace(target, replacement);

fs.writeFileSync(profilePath, content);
console.log('Updated CompanyProfile.jsx to sync global state');
