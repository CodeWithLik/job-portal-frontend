const fs = require('fs');

// 1. Seeker Dashboard
let seeker = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Dashboard.jsx', 'utf8');
seeker = seeker.replace(/<Card>/g, '<Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">');
// Seeker app cards
seeker = seeker.replace(/className="p-0 overflow-hidden flex flex-col h-full border hover:shadow-md transition-shadow"/g, 'className="p-0 overflow-hidden flex flex-col h-full border hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Dashboard.jsx', seeker);

// 2. Recruiter Dashboard
let recruiter = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx', 'utf8');
recruiter = recruiter.replace(/<Card>/g, '<Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx', recruiter);

// 3. Admin Dashboard
let admin = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', 'utf8');
// KPICards use <Card>
admin = admin.replace(/const KPICard = \(\{ icon, label, value, trend \}\) => \(\s*<Card>/, 'const KPICard = ({ icon, label, value, trend }) => (\n  <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', admin);

console.log('Dashboards patched with hover motion!');
