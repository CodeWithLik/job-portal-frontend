const fs = require('fs');

const navbarPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(navbarPath, 'utf8');

const target = `<div className="px-2 py-2">
                      {user.role === 'recruiter' && (
                        <Link 
                          to="/recruiter/company" 
                          onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                        >
                          <Building className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          Company Profile
                        </Link>
                      )}
                      {user.role === 'seeker' && (
                        <Link 
                          to="/seeker/profile" 
                          onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                        >
                          <User className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          View Profile
                        </Link>
                      )}
                    </div>
                    
                    <div className="px-2 py-2 border-t border-gray-100">`;

const replacement = `{user.role !== 'admin' && (
                      <div className="px-2 py-2">
                        {user.role === 'recruiter' && (
                          <Link 
                            to="/recruiter/company" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                          >
                            <Building className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            Company Profile
                          </Link>
                        )}
                        {user.role === 'seeker' && (
                          <Link 
                            to="/seeker/profile" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                          >
                            <User className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            View Profile
                          </Link>
                        )}
                      </div>
                    )}
                    
                    <div className={\`px-2 py-2 \${user.role !== 'admin' ? 'border-t border-gray-100' : ''}\`}>`;

const regex = /<div className="px-2 py-2">\s*\{user\.role === 'recruiter' && \([\s\S]*?View Profile\s*<\/Link>\s*\)\}\s*<\/div>\s*<div className="px-2 py-2 border-t border-gray-100">/m;

content = content.replace(regex, replacement);

fs.writeFileSync(navbarPath, content);
console.log('Fixed Navbar dropdown padding for admin!');
