const fs = require('fs');
const path = require('path');

const registerPath = path.join('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public', 'Register.jsx');
let content = fs.readFileSync(registerPath, 'utf8');

// 1. Replace validateForm
const oldValidateForm = `  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    if (formData.role === 'recruiter' && !formData.company_name.trim()) {
      errors.company_name = 'Company name is required';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must agree to the Terms of Service';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };`;

const newValidateForm = `  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else {
      const emailRegex = /^[^\\s@\\/]+@[^\\s@\\/]+\\.[^\\s@\\/]{2,}$/;
      if (/\\s/.test(formData.email) || /\\.\\./.test(formData.email) || /\\/\\//.test(formData.email) || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else {
      const missing = [];
      if (formData.password.length < 8) missing.push('8 characters');
      if (!/[A-Z]/.test(formData.password)) missing.push('an uppercase letter');
      if (!/[0-9]/.test(formData.password)) missing.push('a number');
      if (!/[^A-Za-z0-9]/.test(formData.password)) missing.push('a special character');

      if (missing.length === 1) {
        errors.password = \`Password must contain at least \${missing[0].replace('an uppercase', 'one uppercase').replace('a special', 'one special').replace('a number', 'one number')}.\`;
      } else if (missing.length > 1) {
        if (missing.length === 4) {
          errors.password = 'Password must contain at least 8 characters, an uppercase letter, a number, and a special character.';
        } else {
          const last = missing.pop();
          errors.password = \`Password must contain at least \${missing.join(', ')}, and \${last}.\`;
        }
      }
    }
    
    if (formData.role === 'recruiter' && !formData.company_name.trim()) {
      errors.company_name = 'Company Name is required.';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must agree to the Terms of Service and Privacy Policy to register.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };`;

content = content.replace(oldValidateForm, newValidateForm);

// 2. Replace handleRegister catch block
const oldCatchBlock = `    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to register. Please try again.';
      
      if (
        (err.response?.status === 409 && errorMsg.toLowerCase().includes('email')) ||
        errorMsg.toLowerCase().includes('user already exists')
      ) {
        setDuplicateEmailError(true);
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setError(errorMsg);
        formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } finally {`;

const newCatchBlock = `    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to register. Please try again.';
      
      if (
        (err.response?.status === 409 && errorMsg.toLowerCase().includes('email')) ||
        errorMsg.toLowerCase().includes('user already exists')
      ) {
        setDuplicateEmailError(true);
      } else if (errorMsg.toLowerCase().includes('password')) {
        setFieldErrors(prev => ({ ...prev, password: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('email') || errorMsg.includes('@')) {
        setFieldErrors(prev => ({ ...prev, email: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('name')) {
        setFieldErrors(prev => ({ ...prev, name: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('company')) {
        setFieldErrors(prev => ({ ...prev, company_name: errorMsg }));
      } else {
        setError(errorMsg);
      }
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {`;

content = content.replace(oldCatchBlock, newCatchBlock);

fs.writeFileSync(registerPath, content);
console.log('Register.jsx patched successfully.');
