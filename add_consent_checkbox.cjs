const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', 'utf8');

// 1. Update handleChange
content = content.replace(
  'setFormData({ ...formData, [e.target.id]: e.target.value });',
  `const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });`
);

// 2. Add validation in handleRegister
const validationTarget = `const pass = formData.password;`;
const validationInjection = `if (!formData.acceptTerms) {
        errors.acceptTerms = 'You must agree to the Terms of Service and Privacy Policy to register.';
      }

      const pass = formData.password;`;
content = content.replace(validationTarget, validationInjection);

// 3. Inject checkbox before the Submit button
// Find the button code:
const buttonRegex = /<button[\s\S]*?type="submit"[\s\S]*?>[\s\S]*?Sign up[\s\S]*?<\/button>/;
const checkboxCode = `
            {/* Terms Consent Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-2 cursor-pointer group">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms || false}
                    onChange={handleChange}
                    className={\`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors \${fieldErrors.acceptTerms ? 'border-red-500' : ''}\`}
                  />
                </div>
                <span className="text-sm text-slate-600 leading-tight">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="text-blue-600 font-medium hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" target="_blank" className="text-blue-600 font-medium hover:underline">Privacy Policy</Link>.
                </span>
              </label>
              {fieldErrors.acceptTerms && <p className="text-xs text-red-500 pl-6 animate-in slide-in-from-top-1 duration-200">{fieldErrors.acceptTerms}</p>}
            </div>

            `;
            
// Wait, I need to make sure <Link> is imported, it probably is. If not, I'll use <a> or assume it's imported (it is, from react-router-dom).
content = content.replace(buttonRegex, match => checkboxCode + match);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', content);
console.log('Consent checkbox added to Register.jsx');
