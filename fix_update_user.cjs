const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Profile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const target = `const savedData = { ...profile, profile_photo: newPhotoUrl };
      setProfile(savedData);
      setOriginalProfile(savedData);
      setPhotoFile(null);
      setPhotoPreview(null);

      showNotification('Profile updated successfully!');`;

// Let's use a regex to be safe with whitespace
const regex = /const savedData = \{ \.\.\.profile, profile_photo: newPhotoUrl \};\s*setProfile\(savedData\);\s*setOriginalProfile\(savedData\);\s*setPhotoFile\(null\);\s*setPhotoPreview\(null\);\s*showNotification\('Profile updated successfully!'\);/m;

const replacement = `const savedData = { ...profile, profile_photo: newPhotoUrl };
      setProfile(savedData);
      setOriginalProfile(savedData);
      setPhotoFile(null);
      setPhotoPreview(null);

      if (updateUser) {
        updateUser({ 
          name: savedData.name, 
          avatar: savedData.profile_photo 
        });
      }

      showNotification('Profile updated successfully!');`;

content = content.replace(regex, replacement);

fs.writeFileSync(profilePath, content);
console.log('Fixed Profile.jsx updateUser call');
