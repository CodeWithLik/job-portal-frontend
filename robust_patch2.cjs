const fs = require('fs');
const path = 'src/pages/admin/Users.jsx';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings
content = content.replace(/\\r\\n/g, '\\n');

const oldBadge = \`<td className="p-4">
                          <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                            {user.status}
                          </Badge>
                        </td>\`;

const newBadge = \`<td className="p-4">
                          {!user.is_verified ? (
                            <Badge variant="warning">Unverified</Badge>
                          ) : (
                            <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                              {user.status}
                            </Badge>
                          )}
                        </td>\`;

content = content.replace(oldBadge, newBadge);

const oldSelect = \`<option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>\`;

const newSelect = \`<option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="unverified">Unverified</option>
              </select>\`;

content = content.replace(oldSelect, newSelect);

fs.writeFileSync(path, content);
console.log("String replace completed.");
