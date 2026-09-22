const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (content.includes('import { Routes, Route, Navigate } from \'react-router-dom\';')) {
  content = content.replace('import { Routes, Route, Navigate } from \'react-router-dom\';', 'import { useEffect } from \'react\';\nimport { Routes, Route, Navigate, useLocation } from \'react-router-dom\';');
}

content = content.replace('function App() {', `function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {`);

content = content.replace('<Routes>', '<>\n      <ScrollToTop />\n      <Routes>');
content = content.replace('</Routes>', '</Routes>\n    </>');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx patched for ScrollToTop');
