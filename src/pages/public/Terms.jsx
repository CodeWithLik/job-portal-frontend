import { Link } from 'react-router-dom';
import {  FileText, UserCheck, AlertTriangle, Cpu, PowerOff } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="flex-grow flex flex-col bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 border-b border-slate-100 py-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="text-left mb-6">
            
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm font-medium">Last Updated: September 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-10 text-slate-600 leading-relaxed text-pretty">
          
          <section>
            <p className="text-lg">
              Welcome to <strong className="text-slate-900 font-semibold">AI Job Portal</strong>. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. User Accounts & Responsibilities</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>When you create an account, you agree that all information provided is accurate and up to date.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-slate-800">Job Seekers:</strong> You are responsible for ensuring that your resume, skills, and application details are truthful representations of your professional experience.</li>
                <li><strong className="text-slate-800">Employers:</strong> You must represent a legitimate company. Job postings must be for real, available positions. You may not use candidate data for purposes other than recruitment for the specific role applied for.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Acceptable Use Policy</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>To ensure a safe and professional environment, the following actions are strictly prohibited on our platform:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Posting fraudulent, discriminatory, or misleading job listings.</li>
                <li>Submitting fabricated credentials, fake profiles, or falsified resume documents.</li>
                <li>Uploading malicious files, corrupted PDFs, viruses, or automated scraping scripts.</li>
                <li>Misusing the support ticket system or spamming repetitive, unsolicited job applications.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. AI Services & Limitations</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>Our platform uses Artificial Intelligence to parse uploaded resumes, extract candidate skills, highlight core strengths, and generate matching scores. By using our service, you acknowledge that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>AI analysis is provided as a supportive tool to assist job seekers in evaluating their profiles, not a guarantee of employment or interview selection.</li>
                <li>While we strive for high parsing precision, AI models may occasionally misinterpret complex resume layouts. Users are encouraged to manually review and verify their parsed profile details.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <PowerOff className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Termination of Service</h2>
            </div>
            <div className="pl-13 space-y-4">
              <p>We reserve the right to suspend or permanently terminate any account that violates these Terms of Service, without prior notice. Users may also terminate their own accounts at any time through our privacy rights process.</p>
              <p className="mt-4 bg-slate-50 p-4 rounded-lg text-sm border border-slate-100">
                If you have questions regarding these terms, or need to report a violation, please <Link to="/contact" className="text-blue-600 font-semibold hover:underline whitespace-nowrap inline-block">Contact Support</Link>.
              </p>
            </div>
          </section>

        </div>
      </div>
      
    </div>
  );
};
