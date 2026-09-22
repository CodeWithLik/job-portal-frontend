const fs = require('fs');
const path = require('path');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Profile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

// 1. Destructure updateUser
content = content.replace(/const \{ user \} = useAuth\(\);/, 'const { user, updateUser } = useAuth();');

// 2. Call updateUser in handleSaveProfile
// Locate where showNotification('Profile updated successfully!') is called.
const target = `const savedData = { ...profile, profile_photo: newPhotoUrl };
        setProfile(savedData);
        setOriginalProfile(savedData);
        setPhotoFile(null);
        setPhotoPreview(null);
  
        showNotification('Profile updated successfully!');`;

const replacement = `const savedData = { ...profile, profile_photo: newPhotoUrl };
        setProfile(savedData);
        setOriginalProfile(savedData);
        setPhotoFile(null);
        setPhotoPreview(null);
  
        // Propagate changes to global auth state immediately
        if (updateUser) {
          updateUser({ 
            name: savedData.name, 
            avatar: savedData.profile_photo 
          });
        }
        
        showNotification('Profile updated successfully!');`;

content = content.replace(target, replacement);

fs.writeFileSync(profilePath, content);
console.log('Updated Profile.jsx with global state sync');
