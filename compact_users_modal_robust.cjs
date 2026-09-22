const fs = require('fs');

const usersPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Users.jsx';
let content = fs.readFileSync(usersPath, 'utf8');

// Replace space-y-6 inside details modal
content = content.replace(
  /<Modal isOpen=\{detailsModalOpen\} onClose=\{\(\) => setDetailsModalOpen\(false\)\} title="User Details">[\s\S]*?\{userToView && \([\s\S]*?<div className="space-y-6">/,
  `<Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="User Details">\n            {userToView && (\n              <div className="space-y-4">`
);

// Replace grid gap
content = content.replace(
  /<div className="grid grid-cols-2 gap-x-4 gap-y-6 bg-gray-50 p-4 rounded-xl border border-gray-100">/,
  `<div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">`
);

// Reduce logo size slightly to save vertical space
content = content.replace(
  /<div className="h-16 w-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl overflow-hidden border border-blue-200 shrink-0">/,
  `<div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-200 shrink-0">`
);

fs.writeFileSync(usersPath, content);
console.log('Compacted Users.jsx accurately');
