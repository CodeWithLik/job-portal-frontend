const fs = require('fs');

const profilePath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\ApplicantProfile.jsx';
let content = fs.readFileSync(profilePath, 'utf8');

const oldButtonRegex = /<Button variant="outline" size="sm" onClick=\{\(\) => navigate\(-1\)\} className="flex items-center gap-2">\s*<ArrowLeft className="h-4 w-4" \/> Back to Applicants\s*<\/Button>/;

const newButton = `<button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 focus:outline-none font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>`;

content = content.replace(oldButtonRegex, newButton);

fs.writeFileSync(profilePath, content);
console.log('Updated Back button in ApplicantProfile.jsx');
