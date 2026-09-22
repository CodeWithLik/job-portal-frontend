const fs = require('fs');
const path = require('path');

const loginPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Login.jsx');
let content = fs.readFileSync(loginPath, 'utf8');

// 1. Add imports: useRef, CheckCircle2
content = content.replace(
  "import { AlertTriangle, X, Loader2 } from 'lucide-react';",
  "import { AlertTriangle, X, Loader2, CheckCircle2 } from 'lucide-react';"
);

content = content.replace(
  "import { useState, useEffect } from 'react';",
  "import { useState, useEffect, useRef } from 'react';"
);

// 2. Extract location.state.message and add ref
const topDeclarations = `  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const formTopRef = useRef(null);
  const successMessage = location.state?.message;

  // Scroll to success message if it exists
  useEffect(() => {
    if (successMessage) {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [successMessage]);`;

content = content.replace(
  `  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();`,
  topDeclarations
);

// 3. Add ref to the container and display the successMessage
const originalHeader = `        <CardBody className="p-5 sm:p-6">
          <div>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">Log In</h2>
            <p className="text-center text-sm text-gray-600 mb-3">
              Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
            </p>
          </div>
          
          {error && (`;

const newHeader = `        <CardBody className="p-5 sm:p-6">
          <div ref={formTopRef}>
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-2">Log In</h2>
            <p className="text-center text-sm text-gray-600 mb-3">
              Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
            </p>
          </div>
          
          {successMessage && !error && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{successMessage}</p>
              </div>
            </div>
          )}
          
          {error && (`;

content = content.replace(originalHeader, newHeader);

fs.writeFileSync(loginPath, content);
console.log("Patched Login.jsx with scrolling success banner");
