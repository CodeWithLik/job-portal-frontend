const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// Use regex to match the entire catch block dynamically
const catchBlockRegex = /\} catch \(err\) \{[\s\S]*?\} finally \{/;

const newCatchBlock = `} catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to register. Please try again.';
      
      if (
        (err.response?.status === 409 && errorMsg.toLowerCase().includes('email')) ||
        errorMsg.toLowerCase().includes('user already exists')
      ) {
        setDuplicateEmailError(true);
      } else if (errorMsg.toLowerCase().includes('password')) {
        setFieldErrors(prev => ({ ...prev, password: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('email') || errorMsg.includes('@')) {
        setFieldErrors(prev => ({ ...prev, email: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('name')) {
        setFieldErrors(prev => ({ ...prev, name: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('company')) {
        setFieldErrors(prev => ({ ...prev, company_name: errorMsg }));
      } else {
        setError(errorMsg);
      }
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {`;

content = content.replace(catchBlockRegex, newCatchBlock);

fs.writeFileSync(registerPath, content);
console.log('Register.jsx catch block patched successfully.');
