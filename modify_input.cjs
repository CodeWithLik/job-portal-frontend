const fs = require('fs');

const inputPath = 'C:\\Users\\Henna\\Documents\\frontend\\src\\components\\common\\Input.jsx';
let inputContent = fs.readFileSync(inputPath, 'utf8');

// Modify Input to accept wrapperClassName
inputContent = inputContent.replace(
  /export const Input = \(\{ label, labelRight, id, error, type = 'text', \.\.\.props \}\) => \{/,
  "export const Input = ({ label, labelRight, id, error, type = 'text', wrapperClassName = 'mb-4', ...props }) => {"
);
inputContent = inputContent.replace(
  /<div className="mb-4">/,
  '<div className={wrapperClassName}>'
);

fs.writeFileSync(inputPath, inputContent);
console.log('Modified Input to support custom wrapper spacing');
