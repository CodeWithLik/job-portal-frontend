const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/Users.jsx', 'utf8');

// 1. Add useRef to react imports
const oldReactImport = `import { useState, useEffect } from 'react';`;
const newReactImport = `import { useState, useEffect, useRef } from 'react';`;
if (content.includes(oldReactImport)) {
  content = content.replace(oldReactImport, newReactImport);
} else if (!content.includes('useRef')) {
  content = content.replace('import { useState', 'import { useState, useRef');
}

// 2. Add modalTopRef state
const stateBlockTarget = `  const [detailsModalOpen, setDetailsModalOpen] = useState(false);`;
const stateBlockReplacement = `  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const modalTopRef = useRef(null);
  
  useEffect(() => {
    if (addUserModalOpen && (duplicateEmailError || Object.keys(newUserErrors).length > 0)) {
      if (modalTopRef.current) {
        modalTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [duplicateEmailError, newUserErrors, addUserModalOpen]);`;
if (content.includes(stateBlockTarget) && !content.includes('modalTopRef')) {
  content = content.replace(stateBlockTarget, stateBlockReplacement);
}

// 3. Accumulating password errors
const oldPassValidation = `    const pass = newUser.password;
    if (!pass) {
      errors.password = 'Password is required.';
    } else {
      if (pass.length < 8) errors.password = 'Password must be at least 8 characters long.';
      else if (!/[A-Z]/.test(pass)) errors.password = 'Password must include at least one uppercase letter.';
      else if (!/[a-z]/.test(pass)) errors.password = 'Password must include at least one lowercase letter.';
      else if (!/[0-9]/.test(pass)) errors.password = 'Password must include at least one number.';
      else if (!/[-@$!%*?&#^()_+=]/.test(pass)) errors.password = 'Password must include at least one special character.';
    }`;
const newPassValidation = `    const pass = newUser.password;
    if (!pass) {
      errors.password = 'Password is required.';
    } else {
      const passErrors = [];
      if (pass.length < 8) passErrors.push('at least 8 characters');
      if (!/[A-Z]/.test(pass)) passErrors.push('one uppercase letter');
      if (!/[a-z]/.test(pass)) passErrors.push('one lowercase letter');
      if (!/[0-9]/.test(pass)) passErrors.push('one number');
      if (!/[-@$!%*?&#^()_+=]/.test(pass)) passErrors.push('one special character');
      if (passErrors.length > 0) {
        errors.password = 'Password must include: ' + passErrors.join(', ') + '.';
      }
    }`;
if (content.includes(oldPassValidation)) {
  content = content.replace(oldPassValidation, newPassValidation);
}

// 4. Add modalTopRef target div inside Modal
const oldModalTop = `<Modal isOpen={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} title="Add New User">
          {duplicateEmailError && (`;
const newModalTop = `<Modal isOpen={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} title="Add New User">
          <div ref={modalTopRef} className="h-0 w-full" aria-hidden="true" />
          {duplicateEmailError && (`;
if (content.includes(oldModalTop)) {
  content = content.replace(oldModalTop, newModalTop);
}

fs.writeFileSync('src/pages/admin/Users.jsx', content);
console.log('Patch complete.');
