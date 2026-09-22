const fs = require('fs');

const registerPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx';
let registerContent = fs.readFileSync(registerPath, 'utf8');

// 1. Add useRef to imports
registerContent = registerContent.replace(
  "import { useState } from 'react';",
  "import { useState, useRef } from 'react';"
);

// 2. Add formTopRef to component
registerContent = registerContent.replace(
  "const [isLoading, setIsLoading] = useState(false);",
  "const [isLoading, setIsLoading] = useState(false);\n  const formTopRef = useRef(null);"
);

// 3. Update handleRegister for scrolling on validation errors
registerContent = registerContent.replace(
  "if (Object.keys(errors).length > 0) {\n      setFieldErrors(errors);\n      return;\n    }",
  "if (Object.keys(errors).length > 0) {\n      setFieldErrors(errors);\n      if (formTopRef.current) {\n        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });\n      }\n      return;\n    }"
);

// 4. Update catch block to scroll on server errors
const oldCatch = `} catch (err) {
      if (err.response?.status === 409 || err.response?.data?.error === 'User already exists') {
        setDuplicateEmailError(true);
      } else {
        setError(err.response?.data?.error || 'Failed to register. Please try again.');
      }
    } finally {`;

const newCatch = `} catch (err) {
      if (err.response?.status === 409 || err.response?.data?.error === 'User already exists') {
        setDuplicateEmailError(true);
      } else {
        setError(err.response?.data?.error || 'Failed to register. Please try again.');
      }
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } finally {`;

registerContent = registerContent.replace(oldCatch, newCatch);

// 5. Add ref to the Card container
registerContent = registerContent.replace(
  '<Card className="max-w-md w-full">',
  '<Card className="max-w-md w-full" ref={formTopRef}>'
);
// Wait, Card might not support forwarding ref depending on how it's implemented. Let's put a div right above it or inside it.
registerContent = registerContent.replace(
  '<Card className="max-w-md w-full" ref={formTopRef}>', // Revert above immediately if we do it inline
  '<Card className="max-w-md w-full">'
);
registerContent = registerContent.replace(
  '<CardBody className="p-6">',
  '<CardBody className="p-6">\n            <div ref={formTopRef} className="scroll-mt-6" />'
);

// 6. Update Duplicate Email Alert UX
const oldDuplicateAlert = `{duplicateEmailError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      An account with this email already exists. 
                      <Link to="/login" className="underline font-semibold hover:text-rose-900 ml-1">Log in</Link>
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-rose-400 hover:text-rose-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}`;

const newDuplicateAlert = `{duplicateEmailError && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-sm mb-6 flex items-start justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-800 m-0 p-0 leading-tight">An account with this email already exists.</h3>
                    <div className="mt-1 m-0 p-0 leading-snug">
                      <Link to="/login" className="text-red-700 font-medium hover:text-red-900 underline underline-offset-2">Log in to your account →</Link>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-3">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}`;

registerContent = registerContent.replace(oldDuplicateAlert, newDuplicateAlert);

fs.writeFileSync(registerPath, registerContent);
console.log('Fixed auto-scroll and duplicate email alert on Register page');
