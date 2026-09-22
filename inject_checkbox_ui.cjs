const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', 'utf8');

const targetButton = '<Button type="submit"';

const checkboxUI = `
            {/* Terms Consent Checkbox */}
            <div className="space-y-1 mb-2 mt-4">
              <label className="flex items-start gap-2 cursor-pointer group">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms || false}
                    onChange={handleChange}
                    className={\`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors \${fieldErrors.acceptTerms ? 'border-red-500 ring-red-500' : ''}\`}
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

if (!content.includes('id="acceptTerms"')) {
  content = content.replace(targetButton, checkboxUI + targetButton);
  fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Register.jsx', content);
  console.log('Checkbox successfully injected');
} else {
  console.log('Checkbox already exists');
}
