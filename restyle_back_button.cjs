const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// 1. Add ArrowLeft to lucide-react imports
content = content.replace(
  "import { MapPin, DollarSign, Briefcase, Clock, Building, AlertCircle, CheckCircle, Loader2, X } from 'lucide-react';",
  "import { MapPin, DollarSign, Briefcase, Clock, Building, AlertCircle, CheckCircle, Loader2, X, ArrowLeft } from 'lucide-react';"
);

// 2. Replace the back button
const oldButtonRegex = /<button onClick=\{handleBack\} className="text-blue-600 hover:underline flex items-center gap-1 mb-4 focus:outline-none">\s*&larr; Back\s*<\/button>/;
const newButton = `<button 
          onClick={handleBack} 
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 mb-4 focus:outline-none font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>`;

content = content.replace(oldButtonRegex, newButton);

fs.writeFileSync(jobDetailsPath, content);
console.log('Restyled Back button in JobDetails.jsx');
