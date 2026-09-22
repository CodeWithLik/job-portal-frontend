const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add `X` to lucide-react imports
content = content.replace(
  "import { Bookmark, MapPin, Briefcase, Loader2, Trash2 } from 'lucide-react';",
  "import { Bookmark, MapPin, Briefcase, Loader2, Trash2, X } from 'lucide-react';"
);

// 2. Add `notification` state
content = content.replace(
  'const [loading, setLoading] = useState(true);',
  `const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);`
);

// 3. Update `handleRemove` to show the toast
const oldHandleRemove = `  const handleRemove = async (id) => {
    try {
      await api.delete(\`/jobs/\${id}/save\`);
      setSavedJobs(savedJobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Failed to remove saved job', err);
    }
  };`;

const newHandleRemove = `  const handleRemove = async (id) => {
    try {
      await api.delete(\`/jobs/\${id}/save\`);
      setSavedJobs(savedJobs.filter(job => job.id !== id));
      setNotification({ type: 'success', text: 'Job removed from saved list.' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Failed to remove saved job', err);
      setNotification({ type: 'error', text: 'Failed to remove job.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };`;

content = content.replace(oldHandleRemove, newHandleRemove);

// 4. Inject the notification rendering block just after the `<div className="space-y-6 max-w-5xl">` or before it?
// Let's inject it inside the main container div:
/*
  return (
    <div className="space-y-6 max-w-5xl relative">
      {notification && (
        <div className={\`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium \${
          notification.type === 'error'
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }\`}>
          <span>{notification.text}</span>
          <button 
            onClick={() => setNotification(null)}
            className={\`p-1 rounded-md transition-colors \${
              notification.type === 'error'
                ? 'hover:bg-red-100 text-red-600'
                : 'hover:bg-green-100 text-green-600'
            }\`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
*/

const oldReturn = `<div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">`;

const newReturn = `<div className="space-y-6 max-w-5xl">
      {notification && (
        <div className={\`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium \${
          notification.type === 'error'
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }\`}>
          <span>{notification.text}</span>
          <button 
            onClick={() => setNotification(null)}
            className={\`p-1 rounded-md transition-colors \${
              notification.type === 'error'
                ? 'hover:bg-red-100 text-red-600'
                : 'hover:bg-green-100 text-green-600'
            }\`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">`;

content = content.replace(oldReturn, newReturn);

fs.writeFileSync(path, content);
console.log('Added toast notification to SavedJobs.jsx');
