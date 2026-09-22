const fs = require('fs');
const path = 'src/pages/admin/Users.jsx';
let content = fs.readFileSync(path, 'utf8');

const target1 = `<td className="p-4">
                          <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                            {user.status}
                          </Badge>
                        </td>`;
                        
const replace1 = `<td className="p-4">
                          {!user.is_verified ? (
                            <Badge variant="warning">Unverified</Badge>
                          ) : (
                            <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                              {user.status}
                            </Badge>
                          )}
                        </td>`;
                        
content = content.replace(target1, replace1);

const target2 = `<Badge variant={userToView.status === 'Active' ? 'success' : 'error'}>{userToView.status}</Badge>`;
const replace2 = `{!userToView.is_verified ? <Badge variant="warning">Unverified</Badge> : <Badge variant={userToView.status === 'Active' ? 'success' : 'error'}>{userToView.status}</Badge>}`;

content = content.replace(target2, replace2);

fs.writeFileSync(path, content);
console.log('Fixed Users.jsx badging');
