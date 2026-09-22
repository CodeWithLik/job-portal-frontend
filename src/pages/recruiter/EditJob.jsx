import { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Briefcase, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, useAuth } from '../../context/AuthContext';
import { useEnterNextField } from '../../hooks/useEnterNextField';

export const EditJob = () => {
  const navigate = useNavigate();
  const { onKeyDown } = useEnterNextField();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  const [salaryError, setSalaryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const salaryRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    employment_type: '',
    location: '',
    salary_min: '',
    salary_max: '',
    description: '',
    duration_option: '30',
    custom_date: '',
    category: 'Software Engineering',
    status: 'Active'
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data;
        
        if (job.status === 'Suspended') {
          navigate('/recruiter/jobs', { state: { message: 'This job is suspended by an admin.' } });
          return;
        }

        if (job.recruiter_id !== user?.id) {
          setError('Unauthorized: You do not have permission to edit this job.');
          setIsFetching(false);
          return;
        }
        
        // Calculate remaining days for dropdown if possible
        let currentDuration = '30';
        let customDate = '';
        if (job.expires_at) {
          const expiresDate = new Date(job.expires_at);
          const days = Math.ceil((expiresDate - new Date()) / (1000 * 60 * 60 * 24));
          if (expiresDate > new Date() && [2, 5, 7, 15, 30].includes(days)) {
            currentDuration = days.toString();
          } else {
            currentDuration = 'custom';
            customDate = expiresDate.toISOString().split('T')[0];
          }
        }

        setFormData({
          title: job.title || '',
          company: job.company || '',
          employment_type: job.employment_type || '',
          location: job.location || '',
          salary_min: job.salary_min !== null ? job.salary_min : '',
          salary_max: job.salary_max !== null ? job.salary_max : '',
          description: job.description || '',
          duration_option: currentDuration,
          custom_date: customDate,
          category: job.category || 'Software Engineering',
          status: job.status || 'Active'
        });
      } catch (err) {
        console.error('Failed to load job', err);
        setError('Failed to load job details. It may not exist or you might not have permission to view it.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchJob();
  }, [id, user?.id]);

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

  const handleSave = async (e) => {
    e.preventDefault();

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
        salaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

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
        expires_at: expiresAt.toISOString(),
        status: formData.status // Keep original status (e.g. 'Active' or 'Closed'), frontend expiration logic relies on expires_at
      };

      await api.put(`/jobs/${id}`, payload);
      navigate('/recruiter/jobs', { state: { message: 'Job updated successfully!' } });
    } catch (err) {
      console.error(err);
      setError('Failed to update job. Please try again.');
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

  if (isFetching) {
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

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
      </div>

      {error && !error.includes('Unauthorized') && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {error && error.includes('Unauthorized') && (
        <div className="bg-red-50 text-red-800 p-8 rounded-md border border-red-200 text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => navigate('/recruiter/jobs')}>Back to My Jobs</Button>
        </div>
      )}

      {!error.includes('Unauthorized') && (
        <form noValidate onKeyDown={onKeyDown} onSubmit={handleSave}>
          <div className="space-y-6">
            <Card>
              <CardHeader><h2 className="text-lg font-bold">Basic Information</h2></CardHeader>
              <CardBody className="space-y-4">
                <Input id="title" label={<>Job Title <span className="text-red-500">*</span></>} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" error={errors?.title} />
                <Input id="company" label={<>Company Name <span className="text-red-500">*</span></>} name="company" value={formData.company} onChange={handleChange} placeholder="e.g. TechFlow" error={errors?.company} />
                
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2 inline" /> : null}
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
