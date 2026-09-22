import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Brain, Users, ClipboardList } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePostJobClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=/recruiter/post-job');
    } else if (user.role === 'recruiter') {
      navigate('/recruiter/post-job');
    } else {
      alert('Please sign in with a recruiter account to post jobs');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-20 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        Land Your Dream Job with AI Insights, Hire Smarter with Ease
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mb-10 mx-auto">
        A modern platform where job seekers optimize resumes with AI feedback and track applications, while employers publish jobs and evaluate top talent.
      </p>
      
      <div className="flex gap-4 mb-24 justify-center">
        <Link to="/jobs"><Button className="px-8 py-3 text-lg">Browse Jobs</Button></Link>
        <Button variant="outline" className="px-8 py-3 text-lg" onClick={handlePostJobClick}>Post a Job</Button>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-32 text-center">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">HOW IT WORKS</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">How AI Job Portal Works</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Step 01 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Account</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Sign up as a job seeker or employer to access your personalized portal.</p>
          </div>

          {/* Step 02 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Your CV</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Upload your PDF resume to extract skills and receive AI strength feedback.</p>
          </div>

          {/* Step 03 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Search & Save</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Explore active openings, apply filters, and bookmark your top roles.</p>
          </div>

          {/* Step 04 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors h-full flex flex-col">
            <div className="text-5xl font-black text-blue-600 mb-6">04</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Apply & Track</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Submit direct applications and follow your review status in real time.</p>
          </div>

        </div>
      </div>



      <div className="w-full max-w-7xl mx-auto px-4 text-center">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 block">CORE FEATURES</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">What We Provide</h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Resume Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Our integrated AI analyzes your uploaded resume, instantly extracting your core strengths, improvement areas, and technical skills to build a rich profile.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Effortless Job Management</h3>
            <p className="text-gray-600 leading-relaxed">
              Publish job openings in minutes, track active listings, and review candidate applications directly from a streamlined recruiter dashboard.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Application Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Apply to jobs with one click and monitor your application status in real-time through every stage of the review process.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
