const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldPublicLinks = `              {!user ? (
                <>
                  <Link to="/jobs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Find Jobs</Link>
                  <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
                  <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Button>Sign Up</Button>
                  </Link>
                </>
              ) : (`;

const newPublicLinks = `              {!user ? (
                <>
                  {/* Desktop Public Links */}
                  <div className="hidden md:flex items-center gap-4">
                    <Link to="/jobs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Find Jobs</Link>
                    <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
                    <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                  
                  {/* Mobile Public Menu Toggle */}
                  <div className="md:hidden relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
                    >
                      <Menu className="h-6 w-6" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-2 py-1 flex flex-col gap-1">
                          <Link 
                            to="/jobs" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Find Jobs
                          </Link>
                          <Link 
                            to="/login" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Login
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link 
                            to="/register" 
                            onClick={() => { setDropdownOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-3 py-2 text-sm text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (`;

if (content.includes(oldPublicLinks)) {
  content = content.replace(oldPublicLinks, newPublicLinks);
  fs.writeFileSync(path, content);
  console.log("Successfully updated public Navbar to be responsive.");
} else {
  console.log("Could not find the target string.");
}
