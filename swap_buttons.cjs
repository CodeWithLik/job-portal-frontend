const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const target = `<Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
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
                  </Button>`;

const replacement = `<Button 
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
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>`;

// Let's use a regex that matches exactly the button order
const regex = /<Button type="submit" disabled=\{saving\}>\{saving \? 'Saving\.\.\.' : 'Save Changes'\}<\/Button>\s*<Button\s*type="button"\s*variant="outline"\s*onClick=\{\(\) => \{\s*setProfile\(originalProfile \|\| \{\}\);\s*setLogoFile\(null\);\s*setLogoPreview\(null\);\s*setErrors\(\{\}\);\s*setIsEditing\(false\);\s*\}\}\s*disabled=\{saving\}\s*>\s*Cancel\s*<\/Button>/m;

content = content.replace(regex, replacement);

fs.writeFileSync(profilePath, content);
console.log('Swapped buttons in CompanyProfile.jsx');
