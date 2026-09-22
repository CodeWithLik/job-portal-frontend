const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');

// Compact main spacing
content = content.replace(
  '<Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="User Details">\n            {userToView && (\n              <div className="space-y-6">',
  '<Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="User Details">\n            {userToView && (\n              <div className="space-y-4">'
);

// Compact grid spacing
content = content.replace(
  '<div className="grid grid-cols-2 gap-x-4 gap-y-6 bg-gray-50 p-4 rounded-xl border border-gray-100">',
  '<div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">'
);

fs.writeFileSync(usersPath, content);
console.log('Compacted Users.jsx modal to remove scrollbar');
