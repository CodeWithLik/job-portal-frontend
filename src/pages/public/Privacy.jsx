import { Link } from 'react-router-dom';
import {  Shield, Database, Lock, Eye } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 border-b border-slate-100 py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-slate-500 text-sm font-medium">Last Updated: September 2026</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-10 text-slate-600 leading-relaxed text-pretty">
          
          <section>
            <p className="text-lg">
              At <strong className="text-slate-900 font-semibold">AI Job Portal</strong>, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our platform as a job seeker or employer.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>We collect information you provide directly to us when you create an account, upload a resume, post a job, or contact support.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-800">For Job Seekers:</strong> Name, email address, phone number, location, professional summary, skills, and uploaded resume files (PDF).</li>
                <li><strong className="text-slate-800">For Employers:</strong> Company name, contact details, company description, posted job listings, and recruitment preferences.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. How We Use Your Data & AI</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>Your data is used to provide, improve, and secure our services. Because we utilize advanced AI for resume parsing, it's important to understand how your data is processed:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-800">AI Parsing:</strong> Uploaded resumes are securely processed by our AI strictly to extract skills and build your digital profile. Your raw resume data is never used to train public foundational AI models.</li>
                <li><strong className="text-slate-800">Recruiter Matching:</strong> Your profile and resume are only shared with recruiters when you explicitly apply for their job posting.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Data Security</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>We implement strict security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encrypted password hashing, protected resume file storage, secure data transit (HTTPS), and restricted database access.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Your Privacy Rights</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>You have full control over your data on our platform. At any time, you may:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access and update your profile information.</li>
                <li>Request a complete export of your personal data.</li>
                <li>Request permanent deletion of your account and all associated resumes.</li>
              </ul>
              <p className="mt-4 bg-slate-50 p-4 rounded-lg text-sm border border-slate-100">
                If you have any questions about this Privacy Policy or wish to exercise your data rights, please visit our <Link to="/contact" className="text-blue-600 font-semibold hover:underline whitespace-nowrap inline-block">Contact Support</Link> page.
              </p>
            </div>
          </section>

        </div>
      </div>
      
    </div>
  );
};
