const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/Users.jsx', 'utf8');

const oldValidationTarget = `      const errors = {};
      if (!newUser.name.trim()) errors.name = 'Full Name is required.';
      if (!newUser.email.trim()) errors.email = 'Email is required.';
      if (!newUser.password) errors.password = 'Password is required.';
      if (newUser.role === 'recruiter' && !newUser.company_name?.trim()) errors.company_name = 'Company name is required.';
      
      if (Object.keys(errors).length > 0) {`;

const newValidation = `      const errors = {};
      if (!newUser.name.trim()) errors.name = 'Full Name is required.';
      
      const email = newUser.email.trim();
      if (!email) {
        errors.email = 'Email is required.';
      } else {
        if (/\\s/.test(email)) errors.email = 'Email must not contain whitespace.';
        else if ((email.match(/@/g) || []).length !== 1) errors.email = 'Email must contain exactly one @ symbol.';
        else if (/\\.\\./.test(email)) errors.email = 'Email must not contain consecutive dots.';
        else if (!/^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/.test(email)) errors.email = 'Email must have a valid local part, domain, and top-level domain (at least 2 letters).';
      }

      const pass = newUser.password;
      if (!pass) {
        errors.password = 'Password is required.';
      } else {
        if (pass.length < 8) errors.password = 'Password must be at least 8 characters long.';
        else if (!/[A-Z]/.test(pass)) errors.password = 'Password must include at least one uppercase letter.';
        else if (!/[a-z]/.test(pass)) errors.password = 'Password must include at least one lowercase letter.';
        else if (!/[0-9]/.test(pass)) errors.password = 'Password must include at least one number.';
        else if (!/[-@$!%*?&#^()_+=]/.test(pass)) errors.password = 'Password must include at least one special character.';
      }

      if (newUser.role === 'recruiter' && !newUser.company_name?.trim()) errors.company_name = 'Company name is required.';
      
      if (Object.keys(errors).length > 0) {`;

if (content.includes(oldValidationTarget)) {
  content = content.replace(oldValidationTarget, newValidation);
  console.log("Replaced validation successfully.");
} else {
  console.log("Could not find old validation target.");
}


const handleAddUserTarget = `  const handleAddUser = async (e) => {`;
const googleAuthFn = `  const handleGoogleAuth = () => {
    if (newUser.role === 'recruiter' && !newUser.company_name?.trim()) {
      setNewUserErrors({ ...newUserErrors, company_name: 'Company name is required for Google Sign-up.' });
      return;
    }
    
    const baseUrl = \`\${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google\`;
    const params = new URLSearchParams();
    params.append('role', newUser.role);
    if (newUser.role === 'recruiter') {
      params.append('company_name', newUser.company_name);
    }
    window.location.href = \`\${baseUrl}?\${params.toString()}\`;
  };

  const handleAddUser = async (e) => {`;

if (content.includes(handleAddUserTarget)) {
  content = content.replace(handleAddUserTarget, googleAuthFn);
  console.log("Inserted handleGoogleAuth successfully.");
} else {
  console.log("Could not find handleAddUser target.");
}

const buttonsTarget = `            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="ghost" type="button" onClick={() => setAddUserModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create User'}
              </Button>
            </div>`;

const buttonsReplacement = `            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <Button variant="ghost" type="button" onClick={() => setAddUserModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create User'}
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center gap-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={handleGoogleAuth}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
            </div>`;

if (content.includes(buttonsTarget)) {
  content = content.replace(buttonsTarget, buttonsReplacement);
  console.log("Replaced buttons successfully.");
} else {
  console.log("Could not find buttons target.");
}

fs.writeFileSync('src/pages/admin/Users.jsx', content);
