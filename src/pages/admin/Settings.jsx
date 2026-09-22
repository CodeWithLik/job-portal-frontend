import { useState, useEffect } from 'react';
import { Card, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Save, RotateCcw, Loader2, X, CheckCircle2 } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const AdminSettings = () => {
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    allow_user_registration: true,
    allow_recruiter_registration: true,
    allow_job_posting: true,
    allow_job_applications: true
  });

  

  const fetchSettings = async (showPageLoader = true) => {
    try {
      if (showPageLoader) setLoading(true);
      const res = await api.get('/admin/settings');
      // Merge with default values in case API misses some
      setSettings(prev => ({ ...prev, ...res.data }));
    } catch (error) {
      console.error('Failed to load settings:', error);
      showNotification('Failed to load settings from server.', true);
    } finally {
      if (showPageLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, key: '', title: '', message: '' });

  const handleChange = async (key, value) => {
    if (key === 'allow_user_registration' && value === false) {
      setConfirmModal({
        isOpen: true,
        key: 'allow_user_registration',
        title: 'Disable Seeker Registration?',
        message: 'This will prevent new job seekers from creating accounts on the platform. Existing seekers can still log in. Are you sure you want to disable registration?'
      });
      return;
    }
    if (key === 'allow_recruiter_registration' && value === false) {
      setConfirmModal({
        isOpen: true,
        key: 'allow_recruiter_registration',
        title: 'Disable Recruiter Registration?',
        message: 'This will block new employers/recruiters from registering on the platform. Existing recruiters can still log in and manage jobs. Are you sure you want to proceed?'
      });
      return;
    }
    if (key === 'allow_job_posting' && value === false) {
      setConfirmModal({
        isOpen: true,
        key: 'allow_job_posting',
        title: 'Disable Job Posting?',
        message: 'This will immediately restrict recruiters from publishing new jobs on the platform. Are you sure you want to proceed?'
      });
      return;
    }
    if (key === 'allow_job_applications' && value === false) {
      setConfirmModal({
        isOpen: true,
        key: 'allow_job_applications',
        title: 'Disable Job Applications?',
        message: 'This will prevent job seekers from submitting new applications for any job listing. Are you sure you want to proceed?'
      });
      return;
    }
    
    setSettings(prev => ({ ...prev, [key]: value }));

      if ((key === 'allow_user_registration' || key === 'allow_recruiter_registration' || key === 'allow_job_posting' || key === 'allow_job_applications') && value === true) {
      // Auto-save when turning back on
      const newSettings = { ...settings, [key]: true };
      setSaving(true);
      try {
        await api.put('/admin/settings', newSettings);
        showNotification('System settings updated successfully.');
      } catch (error) {
        console.error('Failed to save settings:', error);
        showNotification('Failed to save settings.', true);
      } finally {
        setSaving(false);
      }
    }
  };

  const confirmDisable = async () => {
    const key = confirmModal.key;
    const newSettings = { ...settings, [key]: false };
    setSettings(newSettings);
    setConfirmModal({ isOpen: false, key: '', title: '', message: '' });
    
    setSaving(true);
    try {
      await api.put('/admin/settings', newSettings);
      showNotification('System settings updated successfully.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      showNotification('Failed to save settings.', true);
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (msg, isError = false) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };



  

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-1"></div>
          </div>
        </div>

        {[1, 2].map(i => (
          <div key={i} className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="md:col-span-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-56"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-6 bg-gray-200 rounded-full w-11"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-6 bg-gray-200 rounded-full w-11"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">System Settings</h1>
        </div>
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            <h3 className="font-bold text-gray-900">Registration Settings</h3>
            <p className="text-sm text-gray-500">Control seeker and recruiter account creation.</p>
          </div>
          <Card className="md:col-span-2">
            <CardBody className="space-y-4">
              <Toggle label="Allow Seeker Registration" checked={settings.allow_user_registration} onChange={(v) => handleChange('allow_user_registration', v)} />
              <Toggle label="Allow Recruiter Registration" checked={settings.allow_recruiter_registration} onChange={(v) => handleChange('allow_recruiter_registration', v)} />
            </CardBody>
          </Card>
        </div>

      <div className="border-t border-gray-200"></div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            <h3 className="font-bold text-gray-900">Job & Application Settings</h3>
            <p className="text-sm text-gray-500">Configure job postings and candidate application controls.</p>
          </div>
          <Card className="md:col-span-2">
            <CardBody className="space-y-4">
              <Toggle label="Allow Job Posting" checked={settings.allow_job_posting} onChange={(v) => handleChange('allow_job_posting', v)} />
              <div className="border-t border-gray-100 my-2"></div>
              <Toggle label="Allow Job Applications" checked={settings.allow_job_applications} onChange={(v) => handleChange('allow_job_applications', v)} />
            </CardBody>
          </Card>
        </div>

      <div className="flex justify-end gap-2 pt-6 border-t border-gray-200 text-sm text-gray-500 items-center">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span>All settings are automatically saved when changed</span>
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{confirmModal.title}</h3>
            <p className="text-gray-600 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmModal({ isOpen: false, key: '', title: '', message: '' })}>
                Cancel
              </Button>
              <Button onClick={confirmDisable} className="bg-red-600 hover:bg-red-700 text-white">
                Confirm Disable
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button 
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};
