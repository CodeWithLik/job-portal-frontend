const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `  const handleRoleToggle = (role) => {
    setFormData({ ...formData, role });
    setDuplicateEmailError(false);
  };`,
  `  const handleRoleToggle = (role) => {
    setFormData({ ...formData, role });
    setDuplicateEmailError(false);
    setError('');
  };`
);

fs.writeFileSync(path, content);
console.log('Fixed handleRoleToggle');
