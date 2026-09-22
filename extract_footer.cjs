const fs = require('fs');

const publicLayout = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', 'utf8');

const footerStart = publicLayout.indexOf('<footer');
const footerEnd = publicLayout.indexOf('</footer>') + 9;
const footerCode = publicLayout.substring(footerStart, footerEnd);

const footerComponent = `import { Link } from 'react-router-dom';
import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { user } = useAuth();

  const getCandidateLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    if (user.role !== 'seeker') return '/recruiter/dashboard'; // Basic fallback
    return path;
  };

  const getEmployerLink = (path) => {
    if (!user) return '/login?redirect=' + path;
    if (user.role !== 'recruiter') return '/seeker/dashboard'; // Basic fallback
    return path;
  };

  return (
    ${footerCode}
  );
};
`;

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Footer.jsx', footerComponent);

// Now update PublicLayout to use the new Footer component
let newPublicLayout = publicLayout.replace(footerCode, '<Footer />');
newPublicLayout = "import { Footer } from '../components/common/Footer';\n" + newPublicLayout;

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\layouts\\PublicLayout.jsx', newPublicLayout);
console.log('Footer extracted and PublicLayout updated');
