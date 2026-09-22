const fs = require('fs');

const layoutPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx';
let content = fs.readFileSync(layoutPath, 'utf8');

// The original layout return was:
// <div className="min-h-screen flex flex-col pt-16">
//   <Navbar />
//   <main className="flex-grow flex flex-col">
//     <Outlet />
//   </main>
//   <Footer />
// </div>

const oldBlock = `<div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>`;

const newBlock = `<div className="pt-16">
      <Navbar />
      <main className="min-h-[calc(100vh-18rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync(layoutPath, content);
console.log('Fixed PublicLayout flex bug');
