const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// Insert handleBack before the return statement.
const handleBackRegex = /const formatSalary = \(min, max\) => \{[\s\S]*?return \`\$\$\{min.toLocaleString\(\)\} - \$\$\{max.toLocaleString\(\)\}\`;\s*\};/;

const newHandleBack = `const formatSalary = (min, max) => {
    if (min == null && max == null) return 'Not specified';
    if (min === max) return \`$\${min.toLocaleString()}\`;
    return \`$\${min.toLocaleString()} - $\${max.toLocaleString()}\`;
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(location.pathname.startsWith('/seeker') ? '/seeker/jobs' : '/jobs');
    }
  };`;

content = content.replace(handleBackRegex, newHandleBack);

// Replace the <Link> with <button>
const oldLinkRegex = /<Link to=\{location.pathname.startsWith\('\/seeker'\) \? '\/seeker\/jobs' : '\/jobs'\} className="text-blue-600 hover:underline flex items-center gap-1 mb-4">\s*&larr; Back to jobs\s*<\/Link>/;

const newButton = `<button onClick={handleBack} className="text-blue-600 hover:underline flex items-center gap-1 mb-4 focus:outline-none">
        &larr; Back
      </button>`;

content = content.replace(oldLinkRegex, newButton);

fs.writeFileSync(jobDetailsPath, content);
console.log('Updated back button logic in JobDetails.jsx');
