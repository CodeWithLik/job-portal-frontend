const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx', 'utf8');

const oldCandidateLink = `  const getCandidateLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    if (user.role !== 'seeker') return '/recruiter/dashboard'; // Basic fallback
    return path;
  };`;

const newCandidateLink = `  const getCandidateLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    // Let the router handle role mismatches by showing the Access Restricted screen
    return path;
  };`;

const oldEmployerLink = `  const getEmployerLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    if (user.role !== 'recruiter') return '/seeker/dashboard'; // Basic fallback
    return path;
  };`;

const newEmployerLink = `  const getEmployerLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    // Let the router handle role mismatches by showing the Access Restricted screen
    return path;
  };`;

content = content.replace(oldCandidateLink, newCandidateLink);
content = content.replace(oldEmployerLink, newEmployerLink);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx', content);
console.log('Updated Footer link routing');
