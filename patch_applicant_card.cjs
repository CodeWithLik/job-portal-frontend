const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\recruiter\\Applicants.jsx';

if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // 1. Fix Skills / Applied On row
  const oldSkillsRow = `<div className="mt-4 flex justify-between items-start">`;
  const newSkillsRow = `<div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">`;
  content = content.replace(oldSkillsRow, newSkillsRow);

  // Fix the margin on "Applied on" so it doesn't have an awkward left margin when stacked
  const oldAppliedOn = `<div className="flex items-center gap-1 text-sm text-gray-500 font-medium shrink-0 ml-4 mt-1">`;
  const newAppliedOn = `<div className="flex items-center gap-1 text-sm text-gray-500 font-medium shrink-0 sm:ml-4 sm:mt-1">`;
  content = content.replace(oldAppliedOn, newAppliedOn);

  // 2. Fix the Bottom Action Bar container
  const oldActionBar = `<div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-100 pt-4">`;
  const newActionBar = `<div className="mt-6 flex flex-col md:flex-row gap-4 sm:items-center justify-between border-t border-gray-100 pt-4">`;
  content = content.replace(oldActionBar, newActionBar);

  // 3. Fix the Buttons wrapper
  const oldButtonsWrapper = `<div className="flex flex-wrap gap-3 items-center">`;
  const newButtonsWrapper = `<div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">`;
  content = content.replace(oldButtonsWrapper, newButtonsWrapper);

  // 4. View Profile Button
  const oldProfileBtn = `className="px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 flex items-center gap-2 transition-colors duration-200"`;
  const newProfileBtn = `className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 flex items-center gap-2 transition-colors duration-200"`;
  content = content.replace(oldProfileBtn, newProfileBtn);

  // 5. View Resume Button Group wrapper
  const oldResumeGroup = `<div className="inline-flex shadow-sm" role="group">`;
  const newResumeGroup = `<div className="inline-flex shadow-sm w-full sm:w-auto" role="group">`;
  content = content.replace(oldResumeGroup, newResumeGroup);

  // 6. View Resume Button
  const oldResumeBtn = `className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-600 rounded-l-md hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-200"`;
  const newResumeBtn = `className="w-full justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-600 rounded-l-md hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-200"`;
  content = content.replace(oldResumeBtn, newResumeBtn);
  
  // 7. No Resume Button
  const oldNoResume = `className="px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 bg-white opacity-50 cursor-not-allowed flex items-center gap-2 transition-colors duration-200"`;
  const newNoResume = `className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 bg-white opacity-50 cursor-not-allowed flex items-center gap-2 transition-colors duration-200"`;
  content = content.replace(oldNoResume, newNoResume);

  // 8. Update Status Wrapper
  const oldStatusWrapper = `<div className="flex items-center gap-3">`;
  const newStatusWrapper = `<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full md:w-auto mt-2 sm:mt-0">`;
  content = content.replace(oldStatusWrapper, newStatusWrapper);

  // 9. Update Status Select
  const oldStatusSelect = `className="w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  const newStatusSelect = `className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"`;
  content = content.replace(oldStatusSelect, newStatusSelect);

  fs.writeFileSync(path, content);
  console.log('Successfully polished Applicant Card layout for mobile.');
} else {
  console.log('Applicants.jsx not found');
}
