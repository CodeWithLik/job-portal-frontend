const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add formatDate import
if (!content.includes("import { formatDate }")) {
  content = content.replace(
    "import { Link, useLocation } from 'react-router-dom';",
    "import { Link, useLocation } from 'react-router-dom';\nimport { formatDate } from '../../utils/date';"
  );
}

// 2. Add Calendar to lucide-react imports
if (!content.includes("Calendar")) {
  content = content.replace(
    "import { Bookmark, MapPin, Briefcase, Loader2, Trash2, X } from 'lucide-react';",
    "import { Bookmark, MapPin, Briefcase, Loader2, Trash2, X, Calendar } from 'lucide-react';"
  );
}

// 3. Update the company name block to include the date
const oldCompany = `<p className="text-gray-600 font-medium">{job.company}</p>`;
const newCompany = `<div className="flex flex-col gap-1">
                      <p className="text-gray-600 font-medium">{job.company}</p>
                      {job.saved_at && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4" /> Saved on: {formatDate(job.saved_at)}
                        </div>
                      )}
                    </div>`;

content = content.replace(oldCompany, newCompany);

fs.writeFileSync(path, content);
console.log('Added Saved on date to SavedJobs.jsx');
