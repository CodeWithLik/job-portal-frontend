import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { Building, MapPin, Globe, Mail, Users, Loader2, AlertTriangle, X } from 'lucide-react';
import { useAuth, api } from '../../context/AuthContext';
import { useEnterNextField } from '../../hooks/useEnterNextField';

export const CompanyProfile = () => {
  const { updateUser } = useAuth();
  const { onKeyDown } = useEnterNextField();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');
  const [warning, setWarning] = useState(location.state?.warning || '');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  
  const fileInputRef = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  
  const [profile, setProfile] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    email: '',
    description: '',
    logo: ''
  });
  
  const [originalProfile, setOriginalProfile] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    email: '',
    description: '',
    logo: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/recruiter');
        const profileData = {
          name: res.data.name || '',
          industry: res.data.industry || '',
          size: res.data.size || '',
          location: res.data.location || '',
          website: res.data.website || '',
          email: res.data.email || '',
          description: res.data.description || '',
          logo: res.data.logo || ''
        };
        setProfile(profileData);
        setOriginalProfile(profileData);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setNotification('Failed to load profile.');
        setTimeout(() => setNotification(''), 3000);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [location]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setNotification('Failed to upload: Only JPG, PNG, and WEBP images are allowed.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotification('Failed to upload: Image must be smaller than 5MB.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setProfile({ ...profile, logo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const newErrors = {};
    if (!profile.industry) newErrors.industry = 'Industry is required.';
    if (!profile.location) newErrors.location = 'Location is required.';
    if (!profile.email) newErrors.email = 'Contact Email is required.';
    if (!profile.description) newErrors.description = 'Company Description is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitCount(prev => prev + 1);
      return;
    }
    
    setErrors({});
    setSaving(true);
    try {
      await api.put('/profile/recruiter', profile);
      
      // Handle logo removal
      if (originalProfile.logo && !profile.logo && !logoFile) {
        await api.delete('/profile/recruiter/logo');
      }
      
      let newLogoUrl = profile.logo;
      if (logoFile) {
        const formData = new FormData();
        formData.append('logo', logoFile);
        const logoRes = await api.post('/profile/recruiter/logo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        newLogoUrl = logoRes.data.logo;
      }
      
      const savedProfile = { ...profile, logo: newLogoUrl };
      setProfile(savedProfile);
      setOriginalProfile(savedProfile);
      setLogoFile(null);
      setLogoPreview(null);
        
        if (updateUser) {
          updateUser({
            avatar: newLogoUrl,
            company_name: savedProfile.name || savedProfile.companyName || savedProfile.company_name
          });
        }
        
        setIsEditing(false);
        setNotification('Company profile updated successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
      setNotification('Failed to update company profile.');
      setTimeout(() => setNotification(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (warning) {
      // Clear the router state so the warning doesn't persist on reload
      navigate(location.pathname, { replace: true, state: {} });
      
      // Auto-dismiss the warning after 4 seconds
      const timer = setTimeout(() => {
        setWarning('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [warning, navigate, location.pathname]);

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      const firstInvalidField = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstInvalidField}"]`) || document.getElementById(firstInvalidField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Use preventScroll to avoid immediate jump interrupting the smooth scroll
        el.focus({ preventScroll: true });
      }
    }
  }, [submitCount, errors]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api.defaults.baseURL.replace('/api', '');
    return `${baseUrl}${url}`;
  };

  

  return (
    <div className="max-w-4xl space-y-6">
      {warning && (
        <div className="fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium bg-orange-50/95 text-orange-800 border-orange-200">
          <div className="flex items-center gap-3">
            <span>{warning}</span>
          </div>
          <button 
            onClick={() => setWarning('')}
            className="p-1 rounded-md transition-colors hover:bg-orange-100 text-orange-600"
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>

      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.includes('Failed')
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification}</span>
          <button 
            onClick={() => setNotification('')}
            className={`p-1 rounded-md transition-colors ${
              notification.includes('Failed')
                ? 'hover:bg-red-100 text-red-600' 
                : 'hover:bg-green-100 text-green-600'
            }`}
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Card>
        <CardBody className="p-8">
          {isEditing ? (
            <ErrorBoundary>
              <form noValidate onKeyDown={onKeyDown} onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 overflow-hidden group">
                    {logoPreview || profile?.logo ? (
                      <>
                        <img src={logoPreview || getImageUrl(profile?.logo)} alt="Company Logo Preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1 shadow-sm text-gray-500 hover:text-red-600 transition-colors"
                          title="Remove logo"
                          aria-label="Remove logo"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    ) : (
                      <Building className="h-10 w-10" />
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleLogoChange} 
                      accept="image/png, image/jpeg, image/webp" 
                      className="hidden" 
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Upload New Logo
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input id="name" name="name" label="Company Name" value={profile?.name || ''} disabled readOnly className="bg-gray-100 cursor-not-allowed" />
                  <Input id="industry" name="industry" label={<>Industry <span className="text-red-500">*</span></>} value={profile?.industry || ''} onChange={handleProfileChange} error={errors?.industry} />
                  <Input id="size" name="size" label="Company Size" value={profile?.size || ''} onChange={handleProfileChange} />
                  <Input id="location" name="location" label={<>Location <span className="text-red-500">*</span></>} value={profile?.location || ''} onChange={handleProfileChange} error={errors?.location} />
                  <Input id="website" name="website" label="Website" type="url" value={profile?.website || ''} onChange={handleProfileChange} />
                  <Input id="email" name="email" label={<>Contact Email <span className="text-red-500">*</span></>} type="email" value={profile?.email || ''} onChange={handleProfileChange} error={errors?.email} />
                </div>
                
                <Textarea id="description" name="description" label={<>Company Description <span className="text-red-500">*</span></>} rows={5} value={profile?.description || ''} onChange={handleProfileChange} error={errors?.description} />
                
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setProfile(originalProfile || {});
                      setErrors({});
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>
              </form>
            </ErrorBoundary>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="h-24 w-24 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                    {profile.logo ? (
                      <img src={getImageUrl(profile.logo)} alt={profile.name} className="h-full w-full object-cover" />
                    ) : (
                      <Building className="h-12 w-12" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {profile.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {profile.location}</span>}
                      {profile.website && <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.website.replace('https://', '').replace('http://', '')}</a></span>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">About Us</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{profile.description || 'No description provided.'}</p>
                </div>
              </div>
              
              <div>
                <Card className="bg-gray-50 border-none shadow-none">
                  <CardBody className="space-y-4 p-5">
                    {profile.industry && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2"><Building className="h-4 w-4" /> Industry</p>
                        <p className="font-medium">{profile.industry}</p>
                      </div>
                    )}
                    {profile.size && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2"><Users className="h-4 w-4" /> Company Size</p>
                        <p className="font-medium">{profile.size}</p>
                      </div>
                    )}
                    {profile.email && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2"><Mail className="h-4 w-4" /> Contact</p>
                        <a href={`mailto:${profile.email}`} className="font-medium text-blue-600 hover:underline">{profile.email}</a>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
