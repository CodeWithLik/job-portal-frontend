import { useState, useEffect, useRef } from 'react';
import { formatDate } from '../../utils/date';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { MapPin, DollarSign, Briefcase, Clock, Building, AlertCircle, CheckCircle, Loader2, X, ArrowLeft } from 'lucide-react';
import { api, useAuth } from '../../context/AuthContext';

export const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, systemSettings, fetchSystemSettings } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isGuest = !user;
  const isSeeker = user?.role === 'seeker';
  const isRecruiter = user?.role === 'recruiter';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isSeeker && location.pathname === `/jobs/${id}`) {
      navigate(`/seeker/jobs/${id}`, { replace: true });
    }
  }, [isSeeker, location, navigate, id]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  
  // Actually we need to check if they applied. For simplicity, if they get 400 'already applied', we catch it.
  const [hasApplied, setHasApplied] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    fetchSystemSettings();
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load job', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (isSeeker) {
      const fetchStatus = async () => {
        try {
          const res = await api.get(`/jobs/${id}/status`);
          setHasSaved(res.data.saved);
          if (res.data.applicationStatus) {
            setHasApplied(true);
            setApplicationStatus(res.data.applicationStatus);
          }
        } catch (err) {
          console.error('Failed to load job status', err);
        }
      };
      fetchStatus();
    }
  }, [id, isSeeker]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [seekerProfile, setSeekerProfile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [appResumeFile, setAppResumeFile] = useState(null);
  const [useSavedResume, setUseSavedResume] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const fileInputRef = useRef(null);

  const openApplicationModal = async () => {
    if (systemSettings?.allow_job_applications === false) {
      setNotification({ type: 'error', text: 'Applications are currently disabled by administration.' });
      setTimeout(() => setNotification(null), 4000);
      return;
    }
    if (isGuest) {
      setShowLoginModal(true);
    } else if (isRecruiter || isAdmin) {
      setNotification({ type: 'error', text: 'Only job seekers can apply for jobs.' });
      setTimeout(() => setNotification(null), 4000);
    } else if (isSeeker) {
      if (hasApplied) return;
      
      setLoadingProfile(true);
      try {
        const res = await api.get('/profile/seeker');
        setSeekerProfile(res.data);
        setUseSavedResume(true);
        setAppResumeFile(null);
        setCoverLetter('');
      } catch (err) {
        console.error('Failed to load profile for application', err);
      } finally {
        setLoadingProfile(false);
        setShowApplyModal(true);
      }
    }
  };

  const submitApplication = async () => {
    if (isApplying) return;
    
    if (!appResumeFile && (!useSavedResume || !seekerProfile?.resume_url)) {
      setNotification({ type: 'error', text: 'Please upload a resume to apply for this job.' });
      return;
    }

    setIsApplying(true);
    setShowApplyModal(false); // Close modal immediately per user request
    
    const formData = new FormData();
    if (coverLetter) formData.append('cover_letter', coverLetter);
    if (appResumeFile) formData.append('resume', appResumeFile);
    formData.append('use_saved_resume', useSavedResume);

    try {
      await api.post(`/jobs/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setHasApplied(true);
      setApplicationStatus('Applied');
      setNotification({ type: 'success', text: 'Application submitted successfully!' });
    } catch (err) {
      setNotification({ type: 'error', text: err.response?.data?.error || 'Failed to apply for job.' });
      if (err.response?.data?.error?.includes('already applied')) {
        setHasApplied(true);
        setApplicationStatus('Applied');
      }
    } finally {
      setIsApplying(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleSaveJob = async () => {
    if (!isSeeker) return;
    try {
      if (hasSaved) {
        await api.delete(`/jobs/${id}/save`);
        setHasSaved(false);
        setNotification({ type: 'success', text: 'Job removed from saved list.' });
      } else {
        await api.post(`/jobs/${id}/save`);
        setHasSaved(true);
        setNotification({ type: 'success', text: 'Job saved successfully!' });
      }
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', text: hasSaved ? 'Failed to remove job.' : 'Failed to save job.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8 animate-pulse">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-4 w-2/3">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="flex gap-4 pt-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-12 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
  if (error || !job) return <div className="p-8 text-center text-red-600">{error || 'Job not found'}</div>;

  let isExpired = job.status === 'Expired' || job.is_deleted;
  const appStatusLower = (applicationStatus || '').toLowerCase();
  const isDeleted = job.is_deleted || job.status === 'Deleted' || job.status === 'deleted';
  const isClosed = job.status === 'Closed' || job.status === 'closed';
  const isSuspended = job.status === 'Suspended' || job.status === 'suspended';
  const isActive = job.status === 'Active' || job.status === 'active' || job.status === 'Published' || job.status === 'published';
  
  isExpired = job.status === 'Expired' || isDeleted;
  let daysLeft = null;
  
  if (job.expires_at) {
    daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    isExpired = isExpired || daysLeft < 0;
  }

  let singleBadge = null;
  let primaryButton = null;

  const bColors = {
    applied: "bg-gray-100 text-gray-800",
    shortlisted: "bg-yellow-100 text-yellow-800",
    interview: "bg-indigo-100 text-indigo-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    closed: "bg-amber-50 text-amber-700 border border-amber-200/60",
    cancelled: "bg-rose-50 text-rose-700 border border-rose-200/60",
  };

  const makeBadge = (text, cls) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${cls}`}>
      {text}
    </span>
  );

  const makeBtn = (text, cls) => (
    <div className={`w-full text-center px-4 py-2 rounded-md font-medium cursor-default ${cls}`}>
      {text}
    </div>
  );

  if (isSeeker && hasApplied) {
    const displayStatus = applicationStatus ? applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1) : 'Applied';
    
    if (appStatusLower === 'hired') {
      singleBadge = makeBadge(`My Status: Hired`, bColors.hired);
      primaryButton = makeBtn(`✓ Hired`, bColors.hired);
    } else if (appStatusLower === 'rejected') {
      singleBadge = makeBadge(`My Status: Rejected`, bColors.rejected);
      primaryButton = makeBtn(`✕ Rejected`, bColors.rejected);
    } else if (isDeleted) {
      singleBadge = makeBadge(`Position Cancelled`, bColors.cancelled);
      primaryButton = makeBtn(`Position Cancelled`, bColors.cancelled);
    } else if (appStatusLower === 'interview') {
      singleBadge = makeBadge(`My Status: Interview`, bColors.interview);
      primaryButton = makeBtn(`In Interview`, bColors.interview);
    } else if (appStatusLower === 'shortlisted') {
      singleBadge = makeBadge(`My Status: Shortlisted`, bColors.shortlisted);
      primaryButton = makeBtn(`Shortlisted`, bColors.shortlisted);
    } else {
      singleBadge = makeBadge(`My Status: ${displayStatus}`, bColors.applied);
      if (isClosed) {
        primaryButton = makeBtn(`Position Closed`, bColors.closed);
      } else {
        primaryButton = makeBtn(`✓ Applied`, bColors.applied);
      }
    }
  } else {
    // Not applied
    if (isDeleted) {
      singleBadge = makeBadge(`Position Cancelled`, bColors.cancelled);
      primaryButton = makeBtn(`Position Cancelled`, bColors.cancelled);
    } else if (isClosed) {
      singleBadge = makeBadge(`Closed`, bColors.closed);
      primaryButton = makeBtn(`Position Closed`, bColors.closed);
    } else if (isSuspended) {
      singleBadge = makeBadge(`Suspended`, "bg-red-100 text-red-700");
      primaryButton = makeBtn(`Position Suspended`, "bg-red-100 text-red-700");
    } else if (isExpired) {
      singleBadge = makeBadge(`Expired`, "bg-red-100 text-red-700");
      primaryButton = makeBtn(`This position has expired`, "bg-red-100 text-red-700");
    } else if (isActive) {
      if (daysLeft !== null && daysLeft > 0) {
        if (daysLeft === 1) singleBadge = makeBadge(`1 day left`, "bg-yellow-100 text-yellow-800");
        else singleBadge = makeBadge(`${daysLeft} days left`, "bg-blue-100 text-blue-800");
      } else if (daysLeft === 0) {
        singleBadge = makeBadge(`Expires today`, "bg-yellow-100 text-yellow-800");
      }
      
      primaryButton = (
        <Button onClick={openApplicationModal} disabled={isApplying || loadingProfile} className="w-full justify-center">
          {isApplying || loadingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply Now'}
        </Button>
      );
    }
  }

  const formatSalary = (min, max) => {
    if (min == null && max == null) return 'Not specified';
    if (min === max) return `${min.toLocaleString()}`;
    return `${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(location.pathname.startsWith('/seeker') ? '/seeker/jobs' : '/jobs');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button 
          onClick={handleBack} 
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 mb-4 focus:outline-none font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.type === 'error'
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification.text}</span>
          <button 
            onClick={() => setNotification(null)}
            className={`p-1 rounded-md transition-colors ${
              notification.type === 'error'
                ? 'hover:bg-red-100 text-red-600'
                : 'hover:bg-green-100 text-green-600'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                {singleBadge}
              </div>
              
              <div className="flex items-center gap-2 text-lg text-gray-700">
                <button onClick={() => setShowCompanyModal(true)} className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  <Building className="h-5 w-5" /> {job.company}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.employment_type}</div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> 
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Posted on: {formatDate(job.created_at)}</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[140px]">
              {primaryButton}
              {isSeeker && (isActive || hasSaved) && (
                <Button 
                  variant="outline" 
                  className={`w-full justify-center ${hasSaved ? 'text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100' : ''}`}
                  onClick={handleSaveJob}
                >
                  {hasSaved ? '✓ Saved' : 'Save Job'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="text-gray-600 space-y-4 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Sign in to Apply">
        <p className="text-gray-600 mb-6">You need an active job seeker account to apply for this position and track your submission.</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(`/register?role=seeker&redirect=/jobs/${id}`)}>Create Account</Button>
          <Button onClick={() => navigate(`/login?redirect=/jobs/${id}`)}>Sign In</Button>
        </div>
      </Modal>

      <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} title="Application Form">
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-700">Apply for:</p>
            <p className="text-gray-900 font-medium">{job.title}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Full Name:</p>
            <p className="text-gray-900">{seekerProfile?.name || user?.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Email:</p>
            <p className="text-gray-900">{seekerProfile?.email || user?.email}</p>
          </div>
          
          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-700 mb-2">Resume:</p>
            {appResumeFile ? (
              <div className="group relative p-3 bg-blue-50 border border-blue-100 rounded-md mb-3 flex items-center justify-between">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Selected resume: {appResumeFile.name}
                </p>
                <button 
                  type="button" 
                  aria-label="Remove selected resume"
                  onClick={() => { setAppResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : useSavedResume && seekerProfile?.resume_url ? (
              <>
                <div className="group relative p-3 bg-blue-50 border border-blue-100 rounded-md mb-3 flex items-center justify-between">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Using your saved resume: {seekerProfile.resume_name || seekerProfile.resume_url.split('/').pop()}
                  </p>
                  <button 
                    type="button" 
                    aria-label="Remove saved resume from this application"
                    onClick={() => setUseSavedResume(false)}
                    className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload a different resume for this job (optional)
                  </label>
                  <input 
                    type="file" 
                    accept="application/pdf"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => setAppResumeFile(e.target.files[0])}
                    ref={fileInputRef}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-red-50 border border-red-100 rounded-md mb-3">
                  <p className="text-sm text-red-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Please upload a resume to apply for this job.
                  </p>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume (Required)
                  </label>
                  <input 
                    type="file" 
                    accept="application/pdf"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => setAppResumeFile(e.target.files[0])}
                    ref={fileInputRef}
                  />
                </div>
              </>
            )}
          </div>

          <div className="pt-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter (Optional)</label>
            <textarea 
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write a personalized cover letter for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowApplyModal(false)}>Cancel</Button>
          <Button onClick={submitApplication} disabled={isApplying || (!appResumeFile && (!useSavedResume || !seekerProfile?.resume_url))}>
            {isApplying ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={showCompanyModal} onClose={() => setShowCompanyModal(false)} title="Company Profile">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {job.logo ? (
              <img src={`http://localhost:5000${job.logo}`} alt={`${job.company} logo`} className="h-16 w-16 rounded-md object-cover border" />
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                <Building className="h-8 w-8" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.company_name || job.company}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {job.company_location && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">{job.company_location}</p>
              </div>
            )}
            {job.industry && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Industry</p>
                <p className="font-medium text-gray-900">{job.industry}</p>
              </div>
            )}
            {job.company_size && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Company Size</p>
                <p className="font-medium text-gray-900">{job.company_size}</p>
              </div>
            )}
            {job.website && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Website</p>
                <a href={job.website.startsWith('http') ? job.website : `https://${job.website}`} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">
                  {job.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </div>
            )}
          </div>

          {(job.company_description) && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">About Us</h3>
              <p className="text-gray-900 font-medium whitespace-pre-line leading-relaxed">
                {job.company_description}
              </p>
            </div>
          )}
          
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button onClick={() => setShowCompanyModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
