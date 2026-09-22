const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\CompanyProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const regex = /<Button type="submit" disabled=\{saving\}>\{saving \? 'Saving\.\.\.' : 'Save Changes'\}<\/Button>\s*<Button\s*type="button"\s*variant="outline"\s*onClick=\{\(\) => \{\s*setProfile\(originalProfile \|\| \{\}\);\s*setErrors\(\{\}\);\s*setIsEditing\(false\);\s*\}\}\s*>\s*Cancel\s*<\/Button>/m;

const replacement = `<Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setProfile(originalProfile || {});
                      setErrors({});
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>`;

content = content.replace(regex, replacement);
fs.writeFileSync(profilePath, content);
console.log('Swapped effectively!');
