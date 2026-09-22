const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Jobs.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldSelect = `<option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>`;

const newSelect = `<option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="suspended">Suspended</option>
            </select>`;

content = content.replace(oldSelect, newSelect);

fs.writeFileSync(path, content);
console.log('Added Closed to status filter dropdown in Admin Jobs');
