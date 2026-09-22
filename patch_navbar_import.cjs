const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes("import Logo from './Logo';")) {
  content = content.replace("import { Link, useNavigate } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';\nimport Logo from './Logo';");
  fs.writeFileSync(path, content);
  console.log('Successfully added Logo import to Navbar.jsx');
} else {
  console.log('Logo import already exists in Navbar.jsx');
}
