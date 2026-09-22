const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');
content = content.replace(/confirmActivate\(userToView\)/g, 'confirmSuspend(userToView)');
fs.writeFileSync(usersPath, content);

const jobsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
content = fs.readFileSync(jobsPath, 'utf8');
content = content.replace(/confirmActivate\(jobToView\)/g, 'confirmSuspend(jobToView)');
fs.writeFileSync(jobsPath, content);

console.log('Fixed confirmActivate calls');
