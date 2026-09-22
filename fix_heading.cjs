const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

// I will add a <br /> explicitly to force the break exactly where the user wants it, overriding text-pretty for this specific heading.
content = content.replace(
  'Where Opportunity Meets Talent, Intelligently!',
  'Where Opportunity Meets Talent,<br /> Intelligently!'
);

// I'll also add text-wrap utility just in case to the h2
content = content.replace(
  '<h2 className="text-3xl font-bold text-gray-900 leading-tight">',
  '<h2 className="text-3xl font-bold text-gray-900 leading-tight text-wrap">'
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Fixed heading');
