const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Activity.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `{new Date(act.timestamp).toLocaleString(undefined, {
                        month: 'numeric', day: 'numeric', year: 'numeric', 
                        hour: '2-digit', minute: '2-digit', hour12: true 
                      })}`;

content = content.replace(targetStr, '{formatDateTime(act.timestamp)}');

fs.writeFileSync(path, content);
console.log('Fixed Activity.jsx date format');
