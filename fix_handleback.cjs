const fs = require('fs');

const jobDetailsPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\JobDetails.jsx';
let content = fs.readFileSync(jobDetailsPath, 'utf8');

// Insert handleBack before the return statement.
const insertPoint = `return (
    <div className="max-w-5xl mx-auto space-y-6">`;

const handleBackCode = `const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(location.pathname.startsWith('/seeker') ? '/seeker/jobs' : '/jobs');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">`;

content = content.replace(insertPoint, handleBackCode);

fs.writeFileSync(jobDetailsPath, content);
console.log('Fixed handleBack missing declaration');
