import { useState } from 'react';
import { Link } from 'react-router-dom';
import {  ChevronDown, ChevronUp, CheckCircle2, Loader2 } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200 py-3">
      <button 
        className="flex w-full items-center justify-between text-left focus:outline-none group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
      </button>
      {isOpen && (
        <div className="mt-2 text-sm text-slate-600 leading-relaxed pr-4 animate-in slide-in-from-top-1 fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    role: 'Job Seeker',
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) errors.name = 'Please enter a valid full name (minimum 3 characters).';
    
    const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || /\.\./.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message.trim()) errors.message = 'Message is required.';
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedTicketId = `AI-${Math.floor(10000 + Math.random() * 90000)}`;
      const payload = { ...formData, ticketId: generatedTicketId };

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to send');
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setTicketId(generatedTicketId);
    } catch (err) {
      setIsSubmitting(false);
      alert('Failed to send message. Please check your connection and try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      role: 'Job Seeker',
      name: '',
      email: '',
      message: ''
    });
    setIsSuccess(false);
    setTicketId('');
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50 min-h-screen">
      
      {/* Header Banner (Compact) */}
      <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 border-b border-slate-100 py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Contact Support</h1>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Have questions or need assistance? Our support team is here to help job seekers and employers succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout (2-Column Grid) */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
        
        {/* Left Column: Quick Answers */}
        <div className="lg:col-span-5 pt-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Quick Help</h3>
            <p className="text-slate-500 text-sm mb-8">
              Find quick answers to common platform questions before reaching out.
            </p>
            <div className="space-y-3">
              <FaqItem 
                question="Having issues parsing a resume?" 
                answer="Ensure your document is in PDF format and under 5MB." 
              />
              <FaqItem 
                question="Need to edit a posted job?" 
                answer="Head to your Employer Dashboard → Manage Jobs → Edit." 
              />
              <FaqItem 
                question="Can recruiters see my profile before I apply?" 
                answer="No, your profile and resume are only shared with recruiters when you submit an application." 
                />
                <FaqItem 
                  question="What does the AI Resume Analysis provide?" 
                  answer="It analyzes your uploaded resume to calculate an overall resume strength score, identify your top skills, highlight your strengths, and provide personalized suggestions for improvement." 
                />
                <FaqItem 
                  question="How do I export my data or delete my account?" 
                  answer="Submit a message through the form on this page. Our support team will verify your account and process your complete data export or permanent deletion." 
                />
              </div>
          </div>
        </div>

        {/* Right Column: Support Ticket Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-6">
                  Thank you! Your support request has been received. Ticket ID: <strong className="text-slate-900 font-bold">#{ticketId}</strong>. We'll reach out to your email shortly.
                </p>
                <button 
                  onClick={resetForm}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 px-6 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-sm text-slate-500 mb-8">Fill out the form below and our team will get back to you promptly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* User Role Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">I am a...</label>
                    <div className="flex flex-wrap gap-2">
                      {['Job Seeker', 'Employer / Recruiter', 'General Inquiry'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => handleRoleChange(role)}
                          className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                            formData.role === role 
                              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors ${
                          fieldErrors.name 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                      />
                      {fieldErrors.name && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors ${
                          fieldErrors.email 
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                      />
                      {fieldErrors.email && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide detailed information so we can assist you quickly..."
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 outline-none transition-colors resize-y ${
                        fieldErrors.message 
                          ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                          : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                    {fieldErrors.message && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                </form>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
