const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "import { Briefcase, User, LogOut, ChevronDown, Building } from 'lucide-react';",
  "import { Briefcase, User, LogOut, ChevronDown, Building, Menu } from 'lucide-react';"
);

content = content.replace(
  "export const Navbar = ({ userRole = null }) => {",
  "export const Navbar = ({ userRole = null, onMenuClick }) => {"
);

const logoBlock = `<div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <Logo size="md" />
            </Link>
          </div>`;

const newLogoBlock = `<div className="flex items-center gap-3">
            {onMenuClick && (
              <button 
                onClick={onMenuClick}
                className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <Logo size="md" />
            </Link>
          </div>`;

content = content.replace(logoBlock, newLogoBlock);

fs.writeFileSync(path, content);
console.log('Navbar updated');
