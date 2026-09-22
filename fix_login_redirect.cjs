const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx', 'utf8');

const oldLoginSuccess = `    try {
      const user = await login(email, password);
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate(\`/\${user.role}/dashboard\`);
      }
    } catch (err) {`;

const newLoginSuccess = `    try {
      const user = await login(email, password);
      
      if (redirectUrl) {
        // Prevent RBAC loop if they switch to an account with a different role
        const isRoleMismatch = 
          (redirectUrl.startsWith('/seeker/') && user.role !== 'seeker') ||
          (redirectUrl.startsWith('/recruiter/') && user.role !== 'recruiter') ||
          (redirectUrl.startsWith('/admin/') && user.role !== 'admin');
          
        if (isRoleMismatch) {
          navigate(\`/\${user.role}/dashboard\`);
        } else {
          navigate(redirectUrl);
        }
      } else {
        navigate(\`/\${user.role}/dashboard\`);
      }
    } catch (err) {`;

content = content.replace(oldLoginSuccess, newLoginSuccess);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx', content);
console.log('Fixed Login.jsx redirect loop');
