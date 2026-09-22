const fs = require('fs');

let admin = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', 'utf8');

// Remove hardcoded text colors from the icons passed to KPICard
admin = admin.replace(/icon=\{<Users className="text-blue-600" \/>\}/g, 'icon={<Users />}');
admin = admin.replace(/icon=\{<Briefcase className="text-green-600" \/>\}/g, 'icon={<Briefcase />}');

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', admin);
console.log('Fixed AdminDashboard icon colors');
