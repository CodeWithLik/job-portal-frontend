const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Sidebar.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "export const Sidebar = ({ links }) => {",
  "export const Sidebar = ({ links, isOpen, onClose }) => {"
);

// We want to handle closing the sidebar when a link is clicked on mobile.
content = content.replace(
  "to={link.path} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}",
  "to={link.path} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); if (onClose) onClose(); }}"
);

// Wrapping the sidebar in a fragment with a backdrop
const oldWrapper = `<div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 flex flex-col justify-between overflow-y-auto">`;
const newWrapper = `<>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 md:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}
      <div className={\`w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 flex flex-col justify-between overflow-y-auto z-50 transition-transform duration-300 md:translate-x-0 \${isOpen ? 'translate-x-0' : '-translate-x-full'}\`}>`;

content = content.replace(oldWrapper, newWrapper);

// Close fragment at the end
content = content.replace("</div>\n  );\n};", "</div>\n    </>\n  );\n};");

fs.writeFileSync(path, content);
console.log('Sidebar updated');
