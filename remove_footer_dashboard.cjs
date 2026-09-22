const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', 'utf8');

const newMain = `      <main className="ml-64 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-grow p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </main>`;

const oldMain = `      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)]">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>`;

content = content.replace(newMain, oldMain);
content = content.replace("import { Footer } from '../components/common/Footer';\n", "");

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\DashboardLayout.jsx', content);
console.log('Removed Footer from DashboardLayout');
