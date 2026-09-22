const fs = require('fs');

function replaceFile(path, replacements) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  for (let r of replacements) {
    content = content.replace(r.search, r.replace);
  }
  fs.writeFileSync(path, content);
}

// 1. Admin Applications
replaceFile('src/pages/admin/Applications.jsx', [
  { search: /const \[sortOption, setSortOption\] = useState\('match'\);/, replace: "const [sortOption, setSortOption] = useState('newest');" },
  { search: /if \(sortOption === 'match'\) \{\s*result\.sort\(\(a, b\) => \(b\.ai_match_score \|\| 0\) - \(a\.ai_match_score \|\| 0\)\);\s*\} else /, replace: "" },
  { search: /<option value="match">Sort by Match Score<\/option>\s*/, replace: "" },
  { search: /<th className="p-4 font-medium">AI Match<\/th>\s*/, replace: "" },
  { search: /<td className="p-4">\s*<span className="text-sm font-bold text-green-600">\{app\.ai_match_score \|\| 0\}%<\/span>\s*<\/td>\s*/, replace: "" },
  { search: /<div>\s*<p className="text-xs text-gray-500 tracking-wider mb-1">AI Match Score<\/p>\s*<p className="text-sm font-bold text-green-600">\{selectedApp\.ai_match_score \|\| 0\}%<\/p>\s*<\/div>\s*/, replace: "" }
]);

// 2. Admin Dashboard
replaceFile('src/pages/admin/Dashboard.jsx', [
  { search: /,\s*\['Avg AI Match', \$\{stats\.avgAiMatch \|\| 0\}%\]/, replace: "" },
  { search: /<KPICard icon=\{<BrainCircuit \/>\} label="Avg AI Match" value=\{\$\{stats\?\.avgAiMatch \|\| 0\}%\} \/>\s*/, replace: "" }
]);

// 3. Recruiter Applicants
replaceFile('src/pages/recruiter/Applicants.jsx', [
  { search: /const \[sortBy, setSortBy\] = useState\('match'\);/, replace: "const [sortBy, setSortBy] = useState('newest');" },
  { search: /if \(sortBy === 'match'\) return \(b\.ai_match_score \|\| 0\) - \(a\.ai_match_score \|\| 0\);\s*/, replace: "" },
  { search: /<option value="match">Sort by Match Score<\/option>\s*/, replace: "" },
  { search: /<div className="flex flex-col items-end">\s*<div className="flex items-center gap-2 mb-1">\s*<span className="text-sm font-medium text-gray-700">AI Match Score<\/span>\s*<span className="text-lg font-bold text-blue-600">\{app\.ai_match_score \|\| 0\}%<\/span>\s*<\/div>\s*<div className="w-32 bg-gray-200 rounded-full h-2">\s*<div className="bg-blue-600 h-2 rounded-full" style=\{\{ width: \$\{app\.ai_match_score \|\| 0\}% \}\}>\s*<\/div>\s*<\/div>\s*<\/div>/, replace: "" }
]);

// 4. Recruiter Applicant Profile
replaceFile('src/pages/recruiter/ApplicantProfile.jsx', [
  { search: /<div className="text-right">\s*<p className="text-sm text-gray-500 mb-1">AI Match Score<\/p>\s*<div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">\s*<div className="text-lg font-bold text-blue-600">\{application\.ai_match_score \|\| 0\}%<\/div>\s*<\/div>\s*<\/div>/, replace: "" }
]);

// 5. Recruiter Dashboard
replaceFile('src/pages/recruiter/Dashboard.jsx', [
  { search: /<div>\s*<p className="text-sm text-gray-500 font-medium">Avg\. AI Match<\/p>\s*<p className="text-xl font-bold text-gray-900">85%<\/p>\s*<\/div>\s*/, replace: "" }
]);

// 6. Seeker Profile (Rename AI Matched Skills -> AI Extracted Skills)
replaceFile('src/pages/seeker/Profile.jsx', [
  { search: /AI Matched Skills/, replace: "AI Extracted Skills" },
  { search: /Processed for AI matching/, replace: "Processed by AI" }
]);

// 7. Seeker Dashboard (Remove recommended jobs)
replaceFile('src/pages/seeker/Dashboard.jsx', [
  { search: /const \[recommendedJobs, setRecommendedJobs\] = useState\(\[\]\);\s*/, replace: "" },
  { search: /\/\/ Display a couple of jobs as AI recommended mock \(ideally from a specific endpoint later\)\s*setRecommendedJobs\(activeJobs\.slice\(0, 2\)\);\s*/, replace: "" },
  { search: /\{\/\* AI Recommended Jobs \*\/\}\s*<div className="mb-8">\s*<div className="flex items-center justify-between mb-4">\s*<h2 className="text-xl font-bold text-gray-900">AI Recommended Jobs<\/h2>\s*<Link to="\/seeker\/jobs" className="text-blue-600 hover:underline text-sm font-medium">View all recommendations<\/Link>\s*<\/div>\s*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">\s*\{recommendedJobs\.map\(job => \(\s*<JobCard key=\{job\.id\} job=\{job\} \/>\s*\)\)\}\s*<\/div>\s*<\/div>\s*/, replace: "" }
]);

// 8. Public Home (Rewrite text)
replaceFile('src/pages/public/Home.jsx', [
  { search: /Our advanced AI matches your unique skills and experience with the perfect opportunities, streamlining the hiring process for both seekers and recruiters\./, replace: "Our advanced AI instantly analyzes your resume, extracting your core skills and providing deep feedback, streamlining the hiring process for both seekers and recruiters." },
  { search: /<div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">\s*<div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">\s*<BrainCircuit className="h-6 w-6" \/>\s*<\/div>\s*<h3 className="text-xl font-bold mb-2">AI Job Matching<\/h3>\s*<p className="text-gray-600">We analyze job descriptions and score your match, ensuring you only apply to jobs you are highly qualified for\.<\/p>\s*<\/div>\s*<div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">\s*<div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4">\s*<Briefcase className="h-6 w-6" \/>\s*<\/div>\s*<h3 className="text-xl font-bold mb-2">Smart Recommendations<\/h3>\s*<p className="text-gray-600">Get daily recommendations tailored exactly to your career trajectory and technical stack\.<\/p>\s*<\/div>/, replace: "<div className=\"p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow\">\n            <div className=\"bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4\">\n              <BrainCircuit className=\"h-6 w-6\" />\n            </div>\n            <h3 className=\"text-xl font-bold mb-2\">AI Resume Parsing</h3>\n            <p className=\"text-gray-600\">We analyze your resume with advanced AI, identifying strengths and formatting issues instantly.</p>\n          </div>\n          <div className=\"p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow\">\n            <div className=\"bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4\">\n              <Briefcase className=\"h-6 w-6\" />\n            </div>\n            <h3 className=\"text-xl font-bold mb-2\">Instant Feedback</h3>\n            <p className=\"text-gray-600\">Get immediate AI-generated feedback and a readiness score before recruiters even see your application.</p>\n          </div>" }
]);

console.log('Frontend cleanup complete');
