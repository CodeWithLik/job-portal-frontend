const fs = require('fs');

let content = fs.readFileSync('src/pages/public/Register.jsx', 'utf8');

// 1. Rewrite password validation to accumulate all errors
const oldPassValidation = `    const pass = formData.password;
    if (!pass) {
      errors.password = 'Password is required.';
    } else {
      if (pass.length < 8) errors.password = 'Password must be at least 8 characters long.';
      else if (!/[A-Z]/.test(pass)) errors.password = 'Password must include at least one uppercase letter.';
      else if (!/[a-z]/.test(pass)) errors.password = 'Password must include at least one lowercase letter.';
      else if (!/[0-9]/.test(pass)) errors.password = 'Password must include at least one number.';
      else if (!/[^A-Za-z0-9]/.test(pass)) errors.password = 'Password must include at least one special character.';
    }`;

const newPassValidation = `    const pass = formData.password;
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
  console.log('Password validation updated to accumulate all errors.');
} else {
  console.log('Could not find old password validation block.');
}

// 2. Move error blocks from the bottom back to the top
const oldTop = `            <p className="text-center text-sm text-gray-600 mb-4">
              Already have an account? <Link to={\`/login\${redirectUrl ? '?redirect=' + redirectUrl : ''}\`} className="font-medium text-blue-600 hover:text-blue-500">Log in</Link>
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

const newTop = `            <p className="text-center text-sm text-gray-600 mb-4">
              Already have an account? <Link to={\`/login\${redirectUrl ? '?redirect=' + redirectUrl : ''}\`} className="font-medium text-blue-600 hover:text-blue-500">Log in</Link>
            </p>
          </div>
          
          {duplicateEmailError && (
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
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleRegister} noValidate>`;

if (content.includes(oldTop)) {
  content = content.replace(oldTop, newTop);
  console.log('Moved error blocks back to top.');
} else {
  console.log('Could not find oldTop block.');
}

// 3. Remove error blocks from the bottom
const oldBottom = `            {duplicateEmailError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
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
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-1" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>`;

const newBottom = `            <Button type="submit" className="w-full mt-1" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>`;

if (content.includes(oldBottom)) {
  content = content.replace(oldBottom, newBottom);
  console.log('Removed error blocks from bottom.');
} else {
  console.log('Could not find oldBottom block.');
}

fs.writeFileSync('src/pages/public/Register.jsx', content);
