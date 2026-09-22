const fs = require('fs');
const path = require('path');

const authPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\context\\AuthContext.jsx';
let content = fs.readFileSync(authPath, 'utf8');

// 1. Add updateUser function before logout
const updateUserCode = `
  const updateUser = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const logout = () => {`;
content = content.replace(/const logout = \(\) => \{/, updateUserCode);

// 2. Add updateUser to provider values
content = content.replace(/logout \}\}>/, 'logout, updateUser }}>');

fs.writeFileSync(authPath, content);
console.log('Added updateUser to AuthContext');
