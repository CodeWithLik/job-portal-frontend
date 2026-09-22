const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const target = `<div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setProfile(originalProfile || {});
                      setLogoFile(null);
                      setLogoPreview(null);
                      setErrors({});
                      setIsEditing(false);
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </div>`;

const replacement = `<div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setProfile(originalProfile || {});
                      setLogoFile(null);
                      setLogoPreview(null);
                      setErrors({});
                      setIsEditing(false);
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>`;

// Strip all spaces to find the index and then we can slice it
let strippedContent = content.replace(/\s+/g, '');
let strippedTarget = target.replace(/\s+/g, '');

if (strippedContent.includes(strippedTarget)) {
  // We can just use a simple regex matching everything between the div and the close div
  const regex = /<div className="flex justify-end gap-4 pt-4 border-t border-gray-100">\s*<Button type="submit" disabled=\{saving\}>\{saving \? 'Saving\.\.\.' : 'Save Changes'\}<\/Button>\s*<Button\s*type="button"\s*variant="outline"\s*onClick=\{\(\) => \{\s*setProfile\(originalProfile \|\| \{\}\);\s*setLogoFile\(null\);\s*setLogoPreview\(null\);\s*setErrors\(\{\}\);\s*setIsEditing\(false\);\s*\}\}\s*disabled=\{saving\}\s*>\s*Cancel\s*<\/Button>\s*<\/div>/m;
  
  content = content.replace(regex, replacement);
  fs.writeFileSync(profilePath, content);
  console.log('Successfully swapped!');
} else {
  console.log('Could not find target');
}
