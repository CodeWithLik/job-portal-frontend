const fs = require('fs');
const path = 'src/pages/admin/Users.jsx';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings for reliable replacement
content = content.replace(/\\r\\n/g, '\\n');

// 1. Fix Table Badge
const badgeRegex = /<td className="p-4">\\s*<Badge variant={user\\.status === 'Active' \\? 'success' : 'error'}>\\s*{user\\.status}\\s*<\\/Badge>\\s*<\\/td>/;
const newBadge = `<td className="p-4">
                          {!user.is_verified ? (
                            <Badge variant="warning">Unverified</Badge>
                          ) : (
                            <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                              {user.status}
                            </Badge>
                          )}
                        </td>`;
content = content.replace(badgeRegex, newBadge);

// 2. Fix Dropdown Select Options
const selectRegex = /<option value="active">Active<\\/option>\\s*<option value="suspended">Suspended<\\/option>\\s*<\\/select>/;
const newSelect = `<option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="unverified">Unverified</option>
              </select>`;
content = content.replace(selectRegex, newSelect);

fs.writeFileSync(path, content);
console.log("Regex patch completed.");
