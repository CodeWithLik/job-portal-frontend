import { Link, useNavigate } from 'react-router-dom';
import { Target, Eye} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col bg-slate-50 min-h-screen">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/50 border-b border-slate-100 py-10 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
            About <span className="text-blue-600">Us</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 w-full space-y-24 text-pretty">
        
        {/* Narrative Story Section (2-Column Hero Layout) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight text-wrap">
              Where Opportunity Meets Talent,<br /> Intelligently!
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Tired of the old way? Welcome to the future of hiring and career development. AI Job Portal is more than just a job board—it is an intelligent platform designed to elevate careers and streamline hiring workflows.
            </p>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Job Seekers:</strong> We transform your static resume into dynamic, actionable insights with a single upload. Our integrated AI extracts your core strengths, highlights improvement areas, and provides transparent application tracking so your qualifications get the visibility they deserve.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Employers:</strong> We simplify the hiring pipeline from day one. Publish openings in minutes, monitor active listings, and review candidate applications directly from a focused dashboard without clutter or friction.
              </p>
            </div>
            
            <p className="text-lg text-gray-600 font-medium pt-2">
              We combine smart technology with clean design to build connections that drive success. Join us and experience a hiring journey that is faster, smarter, and remarkably transparent.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 transform translate-x-3 translate-y-3 rounded-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="relative w-full h-auto object-cover rounded-2xl shadow-lg border border-slate-100 aspect-[4/3]"
            />
          </div>
        </div>

        {/* Mission & Vision (2-Column Visual Card Grid) */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Target className="h-8 w-8" />
            </div>
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                Our Mission
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the leading platform driving Africa's economic growth by building an intelligent, trusted ecosystem that connects the continent's finest talent with its most innovative employers, shaping a dynamic, inclusive, and efficient future of work.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Eye className="h-8 w-8" />
            </div>
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                Our Vision
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To transform Africa's job market through an advanced, AI-powered platform that removes hiring friction by delivering smart, seamless, and accessible tools—empowering individuals to showcase their potential and enabling organizations to find the right talent with speed and precision.
            </p>
          </div>
        </div>

              </div>

      {/* Bottom CTA Section (Full Width) */}
      <div className="w-full bg-slate-50 pt-12 pb-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-slate-900 font-extrabold text-3xl sm:text-4xl tracking-tight mb-8">
            Ready to experience a better way to hire and be hired?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button className="w-full sm:w-auto px-8 py-3 text-lg">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/recruiter/post-job">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
