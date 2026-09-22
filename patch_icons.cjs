const fs = require('fs');

let seeker = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Dashboard.jsx', 'utf8');
seeker = seeker.replace('bg-gray-100 p-3 rounded-lg text-gray-800', 'bg-gray-100 p-3 rounded-lg text-gray-800 group-hover:bg-blue-600 group-hover:text-white transition-colors');
seeker = seeker.replace('bg-yellow-100 p-3 rounded-lg text-yellow-800', 'bg-yellow-100 p-3 rounded-lg text-yellow-800 group-hover:bg-yellow-600 group-hover:text-white transition-colors');
seeker = seeker.replace('bg-indigo-100 p-3 rounded-lg text-indigo-800', 'bg-indigo-100 p-3 rounded-lg text-indigo-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors');
seeker = seeker.replace('bg-green-100 p-3 rounded-lg text-green-800', 'bg-green-100 p-3 rounded-lg text-green-800 group-hover:bg-green-600 group-hover:text-white transition-colors');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Dashboard.jsx', seeker);

let recruiter = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx', 'utf8');
recruiter = recruiter.replace('bg-blue-100 p-3 rounded-lg text-blue-600', 'bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors');
recruiter = recruiter.replace('bg-green-100 p-3 rounded-lg text-green-600', 'bg-green-100 p-3 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Dashboard.jsx', recruiter);

let admin = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', 'utf8');
admin = admin.replace('p-2 bg-gray-50 rounded-lg text-gray-600', 'p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors');
fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Dashboard.jsx', admin);

console.log('Icons patched!');
