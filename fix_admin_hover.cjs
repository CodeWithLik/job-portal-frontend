const fs = require('fs');

let admin = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', 'utf8');

// Replace the hardcoded colors on the icons with a group-hover text-white override
admin = admin.replace(
  'icon={<Users className="text-blue-600" />}',
  'icon={<Users className="text-blue-600 group-hover:text-white transition-colors" />}'
);

admin = admin.replace(
  'icon={<Briefcase className="text-green-600" />}',
  'icon={<Briefcase className="text-green-600 group-hover:text-white transition-colors" />}'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', admin);
console.log('Admin icons patched to turn white on hover');
