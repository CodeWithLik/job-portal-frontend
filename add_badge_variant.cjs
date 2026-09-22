const fs = require('fs');

const badgePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Badge.jsx';
let content = fs.readFileSync(badgePath, 'utf8');

// Add sand variant to Badge
const badgeRegex = /slate: "bg-slate-100 text-slate-600",/;
const newBadgeVariants = `slate: "bg-slate-100 text-slate-600",
    sand: "bg-amber-100 text-amber-800",`;

content = content.replace(badgeRegex, newBadgeVariants);

// Add sand to AppStatusBadge just in case it's ever used there
const appBadgeRegex = /rejected: "bg-red-100 text-red-800",/;
const newAppBadgeVariants = `rejected: "bg-red-100 text-red-800",
    closed: "bg-amber-100 text-amber-800",`;

content = content.replace(appBadgeRegex, newAppBadgeVariants);

fs.writeFileSync(badgePath, content);
console.log('Added sand variant to Badge.jsx');
