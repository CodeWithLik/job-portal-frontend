const fs = require('fs');

let admin = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', 'utf8');

admin = admin.replace(/icon=\{<Users \/>\} label="New Users"/g, 'icon={<Users className="text-blue-600" />} label="New Users"');
admin = admin.replace(/icon=\{<Briefcase \/>\} label="New Jobs"/g, 'icon={<Briefcase className="text-green-600" />} label="New Jobs"');

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', admin);
console.log('Reverted AdminDashboard icon colors');
