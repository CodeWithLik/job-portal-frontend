const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add useEffect to imports
if (!content.includes('useEffect')) {
  content = content.replace(
    "import { useState, useRef } from 'react';",
    "import { useState, useRef, useEffect } from 'react';"
  );
}

// 2. Extract fetchSystemSettings from useAuth
content = content.replace(
  'const { register, systemSettings } = useAuth();',
  'const { register, systemSettings, fetchSystemSettings } = useAuth();'
);

// 3. Add useEffect to call fetchSystemSettings on mount
const searchStr = 'const [isLoading, setIsLoading] = useState(false);';
const replaceStr = `const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchSystemSettings) {
      fetchSystemSettings();
    }
  }, []);`;

if (!content.includes('if (fetchSystemSettings) {')) {
  content = content.replace(searchStr, replaceStr);
}

fs.writeFileSync(path, content);
console.log('Added useEffect to refetch system settings on Register mount');
