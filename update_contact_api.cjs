const fs = require('fs');
let content = fs.readFileSync('src/pages/public/Contact.jsx', 'utf8');

const oldSubmit = `    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTicketId(\`AI-\${Math.floor(10000 + Math.random() * 90000)}\`);
    }, 1200);`;

const newSubmit = `    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to send');
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setTicketId(\`AI-\${Math.floor(10000 + Math.random() * 90000)}\`);
    } catch (err) {
      setIsSubmitting(false);
      alert('Failed to send message. Please check your connection and try again.');
    }`;

content = content.replace(oldSubmit, newSubmit);
fs.writeFileSync('src/pages/public/Contact.jsx', content);
console.log('Frontend updated to use backend');
