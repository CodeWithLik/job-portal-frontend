const fs = require('fs');
const path = 'src/pages/admin/Users.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetLogic = `    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;`;

const replaceLogic = `    let matchesStatus = false;
    if (statusFilter === 'all') {
      matchesStatus = true;
    } else if (statusFilter === 'unverified') {
      matchesStatus = user.is_verified === false;
    } else {
      matchesStatus = user.status.toLowerCase() === statusFilter && user.is_verified !== false;
    }
    
    return matchesSearch && matchesRole && matchesStatus;`;

content = content.replace(targetLogic, replaceLogic);

const targetSelect = `              <select 
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>`;

const replaceSelect = `              <select 
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="unverified">Unverified</option>
              </select>`;

content = content.replace(targetSelect, replaceSelect);

fs.writeFileSync(path, content);
console.log('Fixed Users.jsx filter dropdown');
