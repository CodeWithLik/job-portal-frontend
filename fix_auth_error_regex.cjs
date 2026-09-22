const fs = require('fs');
const loginPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Login.jsx';
let loginContent = fs.readFileSync(loginPath, 'utf8');

const catchRegex = /\} catch \(err\) \{[\s\S]*?\} finally \{/;

const newCatch = `} catch (err) {
      if (err.response?.status === 403 && err.response?.data?.message?.toLowerCase().includes('suspended')) {
        setError('Your account has been suspended');
        setIsSuspended(true);
      } else if (err.response?.status === 401 && err.response?.data?.error === 'Invalid credentials') {
        setError('Invalid email or password');
        setIsSuspended(false);
      } else {
        setError(err.response?.data?.error || 'Failed to sign in. Please check your credentials.');
        setIsSuspended(false);
      }
    } finally {`;

loginContent = loginContent.replace(catchRegex, newCatch);

fs.writeFileSync(loginPath, loginContent);
console.log('Robustly updated Login.jsx catch block');
