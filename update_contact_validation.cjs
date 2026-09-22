const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', 'utf8');

// 1. Add fieldErrors state
content = content.replace(
  'const [ticketId, setTicketId] = useState(\'\');',
  'const [ticketId, setTicketId] = useState(\'\');\n  const [fieldErrors, setFieldErrors] = useState({});'
);

// 2. Update handleChange to clear errors
const oldHandleChange = `  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };`;
const newHandleChange = `  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };`;
content = content.replace(oldHandleChange, newHandleChange);

// 3. Update handleSubmit with validation
const oldSubmit = `  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {`;

const newSubmit = `  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required.';
    
    const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email is required.';
    } else if (/\\s/.test(email)) {
      errors.email = 'Email must not contain whitespace.';
    } else if (!/^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message.trim()) errors.message = 'Message is required.';
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {`;
content = content.replace(oldSubmit, newSubmit);

// 4. Update form to noValidate
content = content.replace('<form onSubmit={handleSubmit} className="space-y-5">', '<form onSubmit={handleSubmit} className="space-y-5" noValidate>');

// 5. Update Name field (removed required, added error classes)
const oldNameBlock = `                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Likanos Tegene"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>`;
const newNameBlock = `                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Likanos Tegene"
                        className={\`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors \${
                          fieldErrors.name 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                        }\`}
                      />
                      {fieldErrors.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>}
                    </div>`;
content = content.replace(oldNameBlock, newNameBlock);

// 6. Update Email field
const oldEmailBlock = `                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>`;
const newEmailBlock = `                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={\`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors \${
                          fieldErrors.email 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                        }\`}
                      />
                      {fieldErrors.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>}
                    </div>`;
content = content.replace(oldEmailBlock, newEmailBlock);

// 7. Update Message field
const oldMessageBlock = `                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide detailed information so we can assist you quickly..."
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors resize-y"
                    />
                  </div>`;
const newMessageBlock = `                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide detailed information so we can assist you quickly..."
                      className={\`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors resize-y \${
                        fieldErrors.message 
                          ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                          : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                      }\`}
                    />
                    {fieldErrors.message && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message}</p>}
                  </div>`;
content = content.replace(oldMessageBlock, newMessageBlock);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\Contact.jsx', content);
console.log('Contact form validation updated!');
