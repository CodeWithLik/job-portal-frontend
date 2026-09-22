import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Briefcase, Loader2 , AlertTriangle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api, useAuth } from '../../context/AuthContext';
import { useEnterNextField } from '../../hooks/useEnterNextField';

export const PostJob = () => {
  const { systemSettings, fetchSystemSettings } = useAuth();
  const navigate = useNavigate();
  const { onKeyDown } = useEnterNextField();
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  const [salaryError, setSalaryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const salaryRef = useRef(null);
  
  const [companyProfile, setCompanyProfile] = useState(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    company: '', // Required by backend
    employment_type: '',
    location: '',
    salary_min: '',
    salary_max: '',
    description: '',
    duration_option: '30',
    custom_date: '',
    category: 'Software Engineering' // Default category
  });

  useEffect(() => {
    fetchSystemSettings();
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/recruiter');
        setCompanyProfile(res.data);
        if (res.data && res.data.name) {
          setFormData(prev => ({ ...prev, company: res.data.name }));
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setIsFetchingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstInvalidField}"]`) || document.getElementById(firstInvalidField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
    }
  }, [submitCount, errors]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
    if (e.target.name === 'salary_min' || e.target.name === 'salary_max') {
      setSalaryError('');
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    // Check if company profile is complete before allowing publish
    const isProfileComplete = companyProfile && companyProfile.name;
    if (!isProfileComplete) {
      navigate('/recruiter/company', { 
        state: { warning: 'Please complete your company profile before posting your job.' } 
      });
      return;
    }

    const newErrors = {};
    if (!formData.title) newErrors.title = 'Job Title is required.';
    if (!formData.company) newErrors.company = 'Company Name is required.';
    if (!formData.employment_type) newErrors.employment_type = 'Job Type is required.';
    if (!formData.location) newErrors.location = 'Location is required.';
    if (!formData.description) newErrors.description = 'Job Description is required.';
    if (!formData.duration_option) newErrors.duration_option = 'Job duration is required.';
    if (formData.duration_option === 'custom' && !formData.custom_date) {
      newErrors.custom_date = 'Please select a custom expiration date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitCount(prev => prev + 1);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setError('');
    
    try {
      // Ensure salary logic is correct (backend expects numbers)
      const min = formData.salary_min !== '' && formData.salary_min != null ? parseInt(formData.salary_min, 10) : null;
      const max = formData.salary_max !== '' && formData.salary_max != null ? parseInt(formData.salary_max, 10) : null;

      if ((min !== null && min < 0) || (max !== null && max < 0)) {
        setSalaryError('Salary cannot be a negative value.');
        setIsLoading(false);
        salaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (min !== null && max !== null && min > max) {
        setSalaryError('Minimum salary cannot be greater than maximum salary.');
        setIsLoading(false);
        // Scroll slightly above the salary section for better visibility
        salaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Calculate expires_at
      let expiresAt = new Date();
      if (formData.duration_option === 'custom') {
        expiresAt = new Date(formData.custom_date);
        expiresAt.setHours(23, 59, 59, 999);
      } else {
        expiresAt.setDate(expiresAt.getDate() + parseInt(formData.duration_option, 10));
      }

      const payload = {
        ...formData,
        salary_min: min,
        salary_max: max,
        expires_at: expiresAt.toISOString()
      };

      await api.post('/jobs', payload);
      navigate('/recruiter/jobs', { state: { message: 'Job posted successfully!' } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to post job. Please try again.');
      setIsLoading(false);
    }
  };

  const getTodayDateStr = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const preventMinus = (e) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };

  if (isFetchingProfile) {
    return (
      <div className="max-w-4xl space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-10 bg-gray-200 rounded w-full"></div></div>
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-10 bg-gray-200 rounded w-full"></div></div>
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-10 bg-gray-200 rounded w-full"></div></div>
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-10 bg-gray-200 rounded w-full"></div></div>
          </div>
          <div className="space-y-2"><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-32 bg-gray-200 rounded w-full"></div></div>
        </div>
      </div>
    );
  }

  const isProfileComplete = companyProfile && companyProfile.industry && companyProfile.location && companyProfile.description;

  if (!isProfileComplete) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-10">
          <div className="bg-blue-50 p-4 rounded-full mb-6">
            <Briefcase className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Company Profile</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            To build trust with candidates, please add your company's Industry, Location, and Description before publishing job posts.
          </p>
          <button 
            onClick={() => navigate('/recruiter/company')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go to Company Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        </div>
      </div>

      {systemSettings?.allow_job_posting === false && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200 flex items-start gap-3 text-sm font-medium">
          <span>Job postings are currently disabled by administration.</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form noValidate onKeyDown={onKeyDown} onSubmit={handlePublish} className="space-y-6">
        <fieldset disabled={systemSettings?.allow_job_posting === false} className="space-y-6">
          <Card>
            <CardHeader><h2 className="text-lg font-bold">Basic Information</h2></CardHeader>
            <CardBody className="space-y-4">
              <Input id="title" label={<>Job Title <span className="text-red-500">*</span></>} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" error={errors?.title} />
              <Input id="company" label={<>Company Name <span className="text-red-500">*</span></>} name="company" value={formData.company} onChange={handleChange} placeholder="e.g. TechFlow" disabled error={errors?.company} />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-1">Job Type <span className="text-red-500">*</span></label>
                  <select id="employment_type" name="employment_type" value={formData.employment_type} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.employment_type ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Select a type...</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  {errors?.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
                </div>
                <Input id="location" label={<>Location <span className="text-red-500">*</span></>} name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY or Remote" error={errors?.location} />
              </div>

              <div className="mb-4">
                <label htmlFor="duration_option" className="block text-sm font-medium text-gray-700 mb-1">Job Duration <span className="text-red-500">*</span></label>
                <div className="flex gap-4 items-start">
                  <select id="duration_option" name="duration_option" value={formData.duration_option} onChange={handleChange} className={`w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.duration_option ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="2">2 days (Urgent)</option>
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                    <option value="15">15 days</option>
                    <option value="30">30 days (Default)</option>
                    <option value="custom">Custom Date...</option>
                  </select>
                  {formData.duration_option === 'custom' && (
                    <div className="w-full md:w-1/2">
                      <input 
                        type="date" 
                        name="custom_date"
                        id="custom_date"
                        min={getTodayDateStr()}
                        value={formData.custom_date}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors?.custom_date ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                  )}
                </div>
                {errors?.duration_option && <p className="mt-1 text-sm text-red-600">{errors.duration_option}</p>}
                {errors?.custom_date && formData.duration_option === 'custom' && <p className="mt-1 text-sm text-red-600">{errors.custom_date}</p>}
              </div>

              <div ref={salaryRef} className="pt-2">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input type="number" min="0" onKeyDown={preventMinus} label="Minimum Salary ($)" name="salary_min" value={formData.salary_min} onChange={handleChange} placeholder="e.g. 100000" error={salaryError ? true : undefined} />
                  <Input type="number" min="0" onKeyDown={preventMinus} label="Maximum Salary ($)" name="salary_max" value={formData.salary_max} onChange={handleChange} placeholder="e.g. 130000" error={salaryError ? true : undefined} />
                </div>
                {salaryError && (
                  <p className="text-sm text-red-600 mt-1">{salaryError}</p>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h2 className="text-lg font-bold">Role Details</h2></CardHeader>
            <CardBody className="space-y-4">
              <Textarea 
                id="description"
                label={<>Job Description <span className="text-red-500">*</span></>} 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6} 
                placeholder="High-level overview of the role, responsibilities, and requirements..." 
                error={errors?.description}
              />
            </CardBody>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/recruiter/jobs')}>Cancel</Button>
            <Button type="submit" disabled={isLoading || isFetchingProfile || systemSettings?.allow_job_posting === false}>
              {isLoading || isFetchingProfile ? <Loader2 className="h-4 w-4 animate-spin mr-2 inline" /> : null}
              {isLoading ? 'Publishing...' : 'Publish Job'}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
