import { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { UploadCloud, CheckCircle, Brain, Loader2, FileText, X, User } from 'lucide-react';
import { useAuth, api } from '../../context/AuthContext';
import { InternationalPhoneInput } from '../../components/common/InternationalPhoneInput';
import { useEnterNextField } from '../../hooks/useEnterNextField';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const { onKeyDown } = useEnterNextField();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    headline: '',
    bio: '',
    skills: '',
    phone: '',
    location: '',
    portfolio_url: '',
    github_url: '',
    linkedin_url: '',
    profile_photo: ''
  });
    const [originalProfile, setOriginalProfile] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoInputRef = useRef(null);
  const [skillsList, setSkillsList] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [resumeName, setResumeName] = useState(null);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletingResume, setIsDeletingResume] = useState(false);
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/seeker');
        const data = {
          name: res.data.name || '',
          email: res.data.email || '',
          headline: res.data.headline || '',
          bio: res.data.bio || '',
          skills: res.data.skills || '',
          phone: res.data.phone || '',
          location: res.data.location || '',
          portfolio_url: res.data.portfolio_url || '',
          github_url: res.data.github_url || '',
          linkedin_url: res.data.linkedin_url || '',
          profile_photo: res.data.profile_photo || ''
        };
        setProfile(data);
        setOriginalProfile(data);
        setSkillsList(res.data.skills ? res.data.skills.split(',').map(s => s.trim()).filter(Boolean) : []);
        setResumeUrl(res.data.resume_url);
        setResumeAnalysis(res.data.resume_analysis);
        setResumeName(res.data.resume_name);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      setTimeout(() => {
        const firstInvalidField = Object.keys(errors)[0];
        const el = document.querySelector(`[name="${firstInvalidField}"]`) || document.getElementById(firstInvalidField);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof el.focus === 'function') {
            // Use preventScroll to avoid immediate jump interrupting the smooth scroll
            el.focus({ preventScroll: true });
          }
        }
      }, 100);
    }
  }, [submitCount, errors]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api.defaults.baseURL.replace('/api', '');
    return `${baseUrl}${url}`;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showNotification('Only JPG, PNG, and WEBP images are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image must be smaller than 5MB.');
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setProfile({ ...profile, profile_photo: '' });
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const handleSaveProfile = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Full Name is required.';
    if (!profile.email) newErrors.email = 'Email Address is required.';
    if (!resumeUrl) newErrors.resumeUrl = 'Resume is required before saving.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitCount(prev => prev + 1);
      return;
    }

    setErrors({});
    setSaving(true);
    try {
      await api.put('/profile/seeker', profile);

      if (originalProfile.profile_photo && !profile.profile_photo && !photoFile) {
        await api.delete('/profile/seeker/photo');
      }

      let newPhotoUrl = profile.profile_photo;
      if (photoFile) {
        const formData = new FormData();
        formData.append('profile_photo', photoFile);
        const photoRes = await api.post('/profile/seeker/photo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        newPhotoUrl = photoRes.data.profile_photo;
      }

      const savedData = { ...profile, profile_photo: newPhotoUrl };
      setProfile(savedData);
      setOriginalProfile(savedData);
      setPhotoFile(null);
      setPhotoPreview(null);

      if (updateUser) {
        updateUser({ 
          name: savedData.name, 
          avatar: savedData.profile_photo 
        });
      }

      showNotification('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile', err);
      showNotification('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const handleRemoveResume = async () => {
    setIsDeletingResume(true);
    try {
      await api.delete('/profile/seeker/resume');
      setResumeUrl(null);
      setResumeName(null);
      setResumeAnalysis(null);
      setShowDeleteConfirm(false);
      showNotification('Resume removed successfully!');
    } catch (err) {
      console.error('Failed to remove resume', err);
      showNotification('Failed to remove resume.');
    } finally {
      setIsDeletingResume(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showNotification('Only PDF files are allowed.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/ai/parse-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeUrl(res.data.resume_url);
      setResumeAnalysis(res.data.analysis);
      setResumeName(res.data.resume_name);
      showNotification('Resume uploaded and analyzed successfully!');
    } catch (err) {
      console.error('Upload error', err);
      showNotification('Resume upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };


  const displayFilename = resumeName || (resumeUrl ? resumeUrl.split('/').pop() : '');

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      
      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.includes('failed') || notification.includes('allowed') || notification.includes('required')
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification}</span>
          <button 
            onClick={() => setNotification('')}
            className={`p-1 rounded-md transition-colors ${
              notification.includes('failed') || notification.includes('allowed') || notification.includes('required')
                ? 'hover:bg-red-100 text-red-600' 
                : 'hover:bg-green-100 text-green-600'
            }`}
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 mt-4">
        {/* Profile Photo */}
        <Card className="md:col-span-4 flex flex-col h-full border-gray-200">
          <CardBody className="flex flex-col items-center justify-center flex-grow py-8 bg-gray-50/50 rounded-lg">
            <div className="relative h-28 w-28 bg-white rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 overflow-hidden group mb-5 shadow-sm">
              {photoPreview || profile.profile_photo ? (
                <>
                  <img src={photoPreview || getImageUrl(profile.profile_photo)} alt="Profile Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white rounded-full p-1 shadow-sm text-gray-500 hover:text-red-600 transition-all"
                    title="Remove photo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/webp" 
              className="hidden" 
              ref={photoInputRef}
              onChange={handlePhotoChange}
            />
            <Button type="button" variant="outline" size="sm" onClick={() => photoInputRef.current?.click()} className="bg-white">
              Upload Photo
            </Button>
          </CardBody>
        </Card>

        {/* AI Resume Analysis */}
        <Card id="resumeUrl" className={`md:col-span-8 flex flex-col h-full ${errors.resumeUrl ? 'border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : 'border-blue-100'}`}>
          <CardHeader className="bg-blue-50/50 border-b border-blue-100/50">
            <h2 className="text-lg font-bold flex items-center gap-2 text-blue-900"><Brain className="h-5 w-5 text-blue-600" /> AI Resume Analysis</h2>
          </CardHeader>
          <CardBody className="flex flex-col flex-grow justify-between">
            <div className={`border-2 border-dashed rounded-lg p-6 text-center bg-gray-50/80 flex-grow flex flex-col items-center justify-center ${errors.resumeUrl ? 'border-red-400 mb-2' : 'border-gray-200 mb-5'}`}>
              {loading ? (
                <div className="py-2 w-full max-w-sm mx-auto animate-pulse">
                  <div className="h-14 bg-gray-200 rounded-lg w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
) : resumeUrl ? (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="group relative p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between w-full max-w-sm mx-auto mb-2 shadow-sm transition-all hover:shadow">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-green-100 p-1.5 rounded-md flex-shrink-0">
                        <FileText className="h-5 w-5 text-green-700" />
                      </div>
                      <span className="text-green-800 font-medium truncate text-sm" title={displayFilename}>{displayFilename}</span>
                    </div>
                    <button 
                      type="button" 
                      aria-label="Remove resume"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={uploading}
                      className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity p-1.5 text-green-700 hover:text-green-900 rounded-full hover:bg-green-200 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5 justify-center"><CheckCircle className="h-3.5 w-3.5 text-green-500"/> Processed by AI</p>
                </div>
              ) : (
                <div className="py-2">
                  <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm mb-4">Upload your latest PDF resume for AI parsing <span className="text-red-500">*</span></p>
                  <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </Button>
                </div>
              )}
              
              <input 
                type="file" 
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => {
                  handleFileChange(e);
                  if (errors.resumeUrl) setErrors(prev => ({ ...prev, resumeUrl: '' }));
                }} 
              />
            </div>
            {errors.resumeUrl && <p className="text-red-600 text-sm mb-4 text-center font-medium">{errors.resumeUrl}</p>}
            
            <div>
              <h3 className="font-medium text-gray-700 text-sm mb-2">AI Extracted Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {(resumeAnalysis?.resume?.skills || []).length > 0 ? (resumeAnalysis.resume.skills).map((skill, index) => (
                  <Badge key={index} variant="primary" className="px-2 py-0.5 text-xs flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 shadow-sm">
                    {skill} <CheckCircle className="h-3 w-3 opacity-70" />
                  </Badge>
                )) : (
                  <p className="text-gray-400 text-sm italic">No skills extracted yet. Upload your resume above.</p>
                )}
              </div>
            </div>

            {resumeAnalysis && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full text-left focus:outline-none gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-600" /> Full AI Analysis
                    </span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Score: {resumeAnalysis.score || resumeAnalysis.analysis?.score || 'N/A'}/100
                    </Badge>
                  </div>
                  <span className="text-blue-600 text-sm hover:underline font-medium">
                    {isAnalysisExpanded ? 'Hide Details' : 'View Details'}
                  </span>
                </button>

                {isAnalysisExpanded && (
                  <div className="mt-4 space-y-4 text-sm bg-white p-5 rounded-md border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Summary</h4>
                      <p className="text-gray-600 leading-relaxed">{resumeAnalysis.summary || resumeAnalysis.analysis?.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50/50 p-4 rounded-md border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Strengths</h4>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1">
                          {(resumeAnalysis.strengths || resumeAnalysis.analysis?.strengths || []).map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div className="bg-orange-50/50 p-4 rounded-md border border-orange-100">
                        <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-1"><Brain className="h-4 w-4" /> Areas for Improvement</h4>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1">
                          {(resumeAnalysis.weaknesses || resumeAnalysis.analysis?.weaknesses || []).map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-2">Recommended Skills to Add</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(resumeAnalysis.missingSkills || resumeAnalysis.analysis?.missingSkills || []).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white text-blue-700 rounded text-xs border border-blue-200 font-medium">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50/80 p-4 rounded-md border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">ATS & Formatting Feedback</h4>
                      <ul className="list-disc pl-4 text-gray-600 space-y-1">
                        {(resumeAnalysis.atsFeedback || resumeAnalysis.analysis?.atsFeedback || []).map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <form noValidate onKeyDown={onKeyDown} onSubmit={handleSaveProfile} className="space-y-6">
        {/* Personal Information */}
        <Card overflowHidden={false}>
          <CardHeader>
            <h2 className="text-lg font-bold">Personal Information</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="name" label={<span>Full Name <span className="text-red-500">*</span></span>} name="name" value={profile?.name || ''} onChange={handleProfileChange} error={errors.name} />
                <Input id="email" label={<span>Email Address <span className="text-red-500">*</span></span>} name="email" type="email" value={profile?.email || ''} onChange={handleProfileChange} error={errors.email} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InternationalPhoneInput label="Phone Number" name="phone" value={profile?.phone || ''} onChange={handleProfileChange} />
                <Input label="Location" name="location" value={profile?.location || ''} onChange={handleProfileChange} />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Professional Summary</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input label="Headline" name="headline" placeholder="e.g. Senior Frontend Developer" value={profile?.headline || ''} onChange={handleProfileChange} />
              <Input label="Skills (comma separated)" name="skills" placeholder="React, Node.js, Python" value={profile?.skills || ''} onChange={handleProfileChange} />
              <Textarea label="Bio" name="bio" rows={4} placeholder="Tell us about yourself..." value={profile?.bio || ''} onChange={handleProfileChange} />
            </div>
          </CardBody>
        </Card>

        {/* Professional Links */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Professional Links</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Portfolio URL" name="portfolio_url" type="url" placeholder="https://yourportfolio.com" value={profile?.portfolio_url || ''} onChange={handleProfileChange} />
              <Input label="GitHub URL" name="github_url" type="url" placeholder="https://github.com/username" value={profile?.github_url || ''} onChange={handleProfileChange} />
              <Input label="LinkedIn URL" name="linkedin_url" type="url" placeholder="https://linkedin.com/in/username" value={profile?.linkedin_url || ''} onChange={handleProfileChange} />
            </div>
          </CardBody>
        </Card>
        
        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
        </div>
      </form>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Remove Resume">
        <p className="text-gray-600 mb-6">Are you sure you want to remove your profile resume? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button type="button" onClick={handleRemoveResume} disabled={isDeletingResume} className="bg-red-600 hover:bg-red-700 border-transparent text-white">
            {isDeletingResume ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};





